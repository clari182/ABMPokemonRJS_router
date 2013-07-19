define([
  'jquery', 
  'underscore', 
  'backbone',
	//'handlebars',	
  'text!templates/pokemonEditTemplate.html'
  ], function($, _, Backbone,  pokemonEditTemplate){
	
	var PokemonView = Backbone.View.extend({	
		//template: _.template(pokemonTemplate),
		remove: function(){
			$(this.el).empty();
		},
		render: function(){
			var source = _.template(pokemonEditTemplate);
			var template = Handlebars.compile(pokemonEditTemplate);
			var data = this.model.toJSON();
				//$(this.el).parent().hide();				
			$(this.el).html(template(data));								
			return this;
		}	
	});
	return PokemonView;
});