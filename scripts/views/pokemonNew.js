define([
  'jquery', 
  'underscore', 
  'backbone',
	//'handlebars',	
  'text!templates/pokemonNewTemplate.html'
  ], function($, _, Backbone, pokemonTemplate){
	
	var PokemonView = Backbone.View.extend({	
		//template: _.template(pokemonTemplate),
		remove: function(){
			$(this.el).empty();
		},
		render: function(){
			var template = Handlebars.compile(pokemonTemplate);
			$(this.el).html(template());			
			return this;
		}	
	});
	return PokemonView;
});