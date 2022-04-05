# This is a multi-stage Docker file that requires at least Docker 17.05
# https://docs.docker.com/engine/userguide/eng-image/multistage-build/

# ---- base image -----
FROM node:16 as BASE
WORKDIR /app
# cache files
COPY package-lock.json /app
COPY package.json /app
RUN npm ci
# copy src
COPY . /app
RUN npm run lint

# ---- build release app ----
FROM BASE as BUILD
WORKDIR /app
RUN npm ci --production

# ---- prod image stage ----
FROM node:16-alpine as RELEASE
USER node
EXPOSE 3000
WORKDIR /app
COPY --chown=node:node --from=BUILD /app /app
HEALTHCHECK --start-period=5s --interval=30s --timeout=5s CMD node healthcheck.js
CMD ["npm", "start"]
