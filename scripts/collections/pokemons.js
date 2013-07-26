define([
  'underscore', 
  'backbone', 
  'libs/backbone/localStorage', 
  'models/pokemon'
  ], function(_, Backbone, Store, Pokemon){
			var Pokemons = Backbone.Collection.extend({
				//url: '/pokemons',
				url: 'http://localhost:3000/pokemons',				
				model: Pokemon,
				comparator: function(model) {
						return model.get('level');
				},
				localStorage: new Store("pokemons")							
			});
			return Pokemons;
	});