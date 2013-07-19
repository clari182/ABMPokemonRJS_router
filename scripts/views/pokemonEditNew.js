define([
  'jquery', 
  'underscore', 
  'backbone',	
  'text!templates/pokemonEditTemplate.html'
  ], function($, _, Backbone,  pokemonEditTemplate){
	
	var PokemonView = Backbone.View.extend({			
		remove: function(){
			$(this.el).empty();
		},
		render: function(){			
			var template = Handlebars.compile(pokemonEditTemplate);
			var data = this.model.toJSON();				
			$(this.el).html(template(data));								
			return this;
		}	
	});
	return PokemonView;
});