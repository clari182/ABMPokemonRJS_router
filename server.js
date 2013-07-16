var fs = require('fs');
var express = require('express'),
  http = require('http');

var app = express();

app.configure(function () {

  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname));
});

app.configure('development', function () {

  app.use(express.errorHandler());
});


//
app.get('/', function (req, res) {

  fs.readFile('main.html', 'utf8', function (err, text) {
    res.send(text);
  });
});

http.createServer(app).listen(app.get('port'), function () {

  console.log("Express server listening on port " + app.get('port'));
});