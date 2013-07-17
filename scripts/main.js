require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
		bootstrap: 'libs/backbone/bootstrap',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
	//handlebars: 'libs/handlebars',
    text: 'libs/require/text',
		Pokedex: 'collections/pokedex',
		Pokemon: 'models/pokemon'
  }
});

require(['app'], function(App){
  
		App.initialize();
});
