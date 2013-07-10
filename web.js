var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {

  var fs = require('fs');
  fs.stat(file, function(error, stats){
    fs.open(file, "r", function(error, fd){
      var buf = new Buffer(stats.size);
      fs.readSync(file, buffer, 0, buffer.length, null);
      response.send(buf.toString("utf-8", 0, buffer.length));
    };
  };
 // response.send('Hello World 2!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
