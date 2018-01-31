const http = require('http');

const server = http.createServer(function(request, response) {
  response.end('Hello world!');
});

server.listen(3000, function() {
  console.log('Server listening...');
});
