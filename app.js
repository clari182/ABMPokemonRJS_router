var express = require ('express');
var app = express();

app.configure(function(){
	app.set('view engine', 'jade');
	app.use(express.static('ABMPokemonsRJS_router'));
});

app.get('/', function(req, res){
	res.render('index.jade', {layout: false});
});
/*
app.get('/pokemons/:name?', function(req, res, next) 
{
	var name = req.params.name;
	switch( name ? name.toLowerCase() : '' ) {
		case 'pikachu': res.send(name + ' is my favorite pokemon'); break;
		default: next();		
	}
});

app.get('/pokemons/*?', function(req, res){
	res.send('No pokemons listed');
});

app.get('/?', function(req, res){
	res.send('Hellou');
});
*/
var port = 8080;
app.listen(port);
console.log('Listening on port ' + port);