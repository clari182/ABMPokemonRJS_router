define([
  'jquery',
  'underscore',
  'backbone',
	'views/app',
  'views/pokemonEdit',
	'views/pokemon'
], function($, _, Backbone, AppView, PokemonEdit, Pokemon){
  return Backbone.Router.extend({
    routes: {    
      '/edit': 'editPokemon',
      //'/users': 'showUsers',

      // Default
      '*actions': 'defaultAction'
    },
		initialize: function(options){	
		
		},		
		openList: function(id) {
		},
		editPokemon: function(){
			alert("Edit");
		}
  });
 });