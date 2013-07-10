var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  var buf = new Buffer(256);
  var fs = require('fs');
  var file = "index.html";
  var count = buf.write(fs.readFileSync(file), "utf-8");
  response.send(buf.toString("utf-8", 0, count));
 // response.send('Hello World 2!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
