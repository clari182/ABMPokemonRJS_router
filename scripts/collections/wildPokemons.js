define([
  'underscore', 
  'backbone', 
  //'libs/backbone/localStorage', 
  'models/pokemon'
  ], function(_, Backbone, /*Store, */Pokemon){
			var WildPokemons = Backbone.Collection.extend({
				model: Pokemon
				//localStorage: new Store("wildPokemons")				
			});
			return new WildPokemons;
	});