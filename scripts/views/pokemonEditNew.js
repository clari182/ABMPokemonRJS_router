define([
  'jquery', 
  'underscore', 
  'backbone',	
  'text!templates/pokemonEditTemplate.html'
  ], function($, _, Backbone,  pokemonEditTemplate){
	
	var PokemonView = Backbone.View.extend({			
		events: {
			'click .editPokemon': 'editPokemon'
		},
		remove: function(){
			$(this.el).empty();
		},
		render: function(){			
			var template = Handlebars.compile(pokemonEditTemplate);
			var data = this.model.toJSON();				
			$(this.el).html(template(data));								
			return this;
		},
		editPokemon: function(){
				var pokemon = {
					name: this.$el.find('.txtName').val(),
					level: this.$el.find('.txtLevel').val()
				}
				this.trigger("editPokemon", pokemon);
		}
	});
	return PokemonView;
});