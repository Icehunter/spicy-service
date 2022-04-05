const Hapi = require('@hapi/hapi');

// setup new hapi server
const server = Hapi.server({
  port: process.env.PORT || 3000
});

server.route({
  method: 'GET',
  path: '/api/ping',
  options: {
    auth: false
  },
  handler: async (_request, h) => {
    return h.response({
      still: 'alive'
    });
  }
});

server.start().then(() => {
  console.log('Server running on %s', server.info.uri);
});

// unhandledRection should be logged as critical and process should exit to cleanup
// docker will restart it
process.on('unhandledRejection', (err) => {
  process.exit(1);
});

// this allos SIGTERM events from ECS and local machines to kill the process
// think "CMD/CTRL + C"
Object.entries({
  SIGINT: 2,
  SIGTERM: 15
}).forEach(([key, value]) => {
  process.on(key, () => {
    process.exit(128 + value);
  });
});
