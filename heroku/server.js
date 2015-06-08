'use strict';

var http = require('http');
var port = process.env.PORT || 8080;
var packaj = require('../package.json');
var output = JSON.stringify(packaj, null, 2);

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/json'});
  res.end(output + '\n');
}).listen(port, '127.0.0.1');

console.log('Server running at http://127.0.0.1:' + port + '/');