var http = require("http");
var fs = require("fs");
var extract = require("./extract");

var handleError = function(err, res) {

  res.writeHead(301, {
    Location: "http://localhost:3000/error.html"
  });
  res.end();
};

var server = http.createServer(function(req, res) {
  console.log("Responding to a request.");
  var filePath = extract(req.url);

  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      if (filePath == "http://localhost:3000/test.html") {
        res.setHeader("Content-Type", "text/html");
      }

      if (filePath == "http://localhost:3000/plain.txt") {
        res.setHeader("Content-Type", "text/plain");
      }

      if (filePath == "http://localhost:3000/greensheet.pdf") {
        res.setHeader("Content-Type", "application/pdf");
      }

      if (filePath == "http://localhost:3000/song.mp3") {
        res.setHeader("Content-Type", "audio/mpeg");
      }

      if (filePath == "http://localhost:3000/movie.mp4") {
        res.setHeader("Content-Type", "video/mp4");
      }

      res.end(data);
    }
  });
});

server.listen(3000);
