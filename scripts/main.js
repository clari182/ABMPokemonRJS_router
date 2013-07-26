require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
		bootstrap: 'libs/bootstrap/bootstrap',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
		handlebars: 'libs/handlebars',
    text: 'libs/require/text',
		Pokemons: 'collections/pokemons',
		Pokemon: 'models/pokemon'
  },
	shim: {
		'Backbone': ['Underscore', 'jQuery'],
		'SocialNet': ['Backbone']
	}
});

require(['app'], function(App){
		App.initialize();
});
