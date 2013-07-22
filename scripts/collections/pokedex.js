define([
  'underscore', 
  'backbone', 
  'libs/backbone/localStorage', 
  'models/pokemon'
  ], function(_, Backbone, Store, Pokemon){
			var Pokedex = Backbone.Collection.extend({
				url: 'pokemons.json',
				model: Pokemon,
				comparator: function(model) {
						return model.get('level');
				},
				localStorage: new Store("pokemons")							
			});
			return Pokedex;
	});