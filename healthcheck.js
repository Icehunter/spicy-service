const http = require('http');

const request = http.request(
  {
    host: 'localhost',
    port: '3000',
    path: '/api/ping',
    timeout: 2000
  },
  ({ statusCode }) => {
    console.log(`STATUS: ${statusCode}`);
    if (statusCode == 200) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  }
);

request.on('error', (err) => {
  console.log(`ERROR: ${err}`);
  process.exit(1);
});

request.end();
