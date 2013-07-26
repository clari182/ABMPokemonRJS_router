var fs = require('fs');
var express = require('express'),
  http = require('http');
	pokemon = require('./scripts/pokemons');

var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

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

  fs.readFile('index.html', 'utf8', function (err, text) {
    res.send(text);
  });
});

app.get('/pokemons', pokemon.findAll);
app.get('/pokemons/:id', pokemon.findById);
app.post('/pokemons/', pokemon.addPokemon);
app.put('/pokemons/:id', pokemon.updatePokemon);
app.delete('/pokemons/:id', pokemon.deletePokemon);


http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});