define([
  'jquery', 
  'underscore', 
  'backbone',
	'handlebars',	
  'text!templates/pokemonNewTemplate.html'
  ], function($, _, Backbone, Handlebars,  pokemonTemplate){
	
	var PokemonView = Backbone.View.extend({	
		template: _.template(pokemonTemplate),
		remove: function(){
			$(this.el).empty();
		},
		render: function(){
			$(this.el).html(this.template(this.model.toJSON()));			
			return this;
		}	
	});
	return PokemonView;
});