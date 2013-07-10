var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  var buf = new Buffer(256);
  var fs = require('fs');
  var file = "index.html";
  response.send(buf.toString(fs.readFileSync(file)));
 // response.send('Hello World 2!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
