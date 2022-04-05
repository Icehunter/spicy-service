#! /usr/bin/env bash

set -e
set -x

# using docker stages build the test stage

# BASE run test, lint, used to extract coverage
docker build --target BASE -t $1-base -f Dockerfile .
# BUILD run build, production modules only, used to extract static assets
docker build --target BUILD -t $1-build -f Dockerfile .
# RELEASE final release image, pruned and small
docker build -t $1 -f Dockerfile .
