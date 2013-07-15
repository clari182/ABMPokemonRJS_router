define([
  'underscore', 
  'backbone', 
  'libs/backbone/localStorage', 
  'models/pokemon'
  ], function(_, Backbone, Store, Pokemon){
			var WildPokemons = Backbone.Collection.extend({
				model: Pokemon/*,
				localStorage: new Backbone.LocalStorage("wildPokemons-backbone")*/
				
			});
			return new WildPokemons;
	});