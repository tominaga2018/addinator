const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer(function(request, response) {

  const urlPath = url.parse(request.url).pathname;
  let filePath = `./client/${urlPath}`;

  fs.stat(filePath, function(err, fileInfo) {
    if (err) {
      response.statusCode = 404;
      response.end(`Resource not found: "${urlPath}"`);
    } else {

      if (fileInfo.isDirectory()) {
        filePath += '/index.html';
      }

      fs.readFile(filePath, (err, data) => {
        if (err) {
          response.statusCode = 500;
          response.end(`Server error: "${err}"`);
        } else {
          response.end(data.toString('UTF-8'));
        }
      });
    }
  });

});

const PORT = process.env.PORT || 3000;
server.listen(3000, function() {
  console.log(`Server listening on port ${PORT}...`);
});
