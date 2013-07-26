define([
  'jquery', 
  'underscore', 
  'backbone',
	//'handlebars',	
	'models/pokemon',
  'text!templates/pokemonNewTemplate.html'
  ], function($, _, Backbone, Pokemon, pokemonTemplate){
	
	var PokemonView = Backbone.View.extend({			
		model: new Pokemon,
		events: {
			"click .savePokemon" : "savePokemon"
		},
		remove: function(){
			$(this.el).empty();
		},
		render: function(){
			var template = Handlebars.compile(pokemonTemplate);
			$(this.el).html(template());			
			return this;
		},
		savePokemon: function(){
		console.log('savePokemon');
			var pokemon = new Pokemon({
				name: this.$el.find('.txtName').val(),
				level: this.$el.find('.txtLevel').val()
			});
			console.log('antes del trigger');
			this.trigger("savePokemon", pokemon);
		}
	});
	return PokemonView;
});