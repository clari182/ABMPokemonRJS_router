define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/pokemonTemplate.html'
  ], function($, _, Backbone, pokemonTemplate){
	
	var PokemonView = Backbone.View.extend({
		tagName: 'tr',		
		events:{				
			"dblclick .view": "edit",
			"click .edit": "enableEdit",
			"click .destroy": "clear"	,
			"keypress .fieldEdit": "updateOnEnter",
			"click .pokemonData": "enableEdit",
			"dblclick .pokemonData": "duplicatePokemon"
		},
		initialize: function() {
			var self = this;			
			self.listenTo(self.model, "change", self.render);
			self.listenTo(self.model, "destroy", self.remove);
			
		},
		render: function() {
			this.$el.empty();			
			var source   = _.template(pokemonTemplate);
			var template = Handlebars.compile(source);
			var data = { 
				name: this.model.toJSON().name,
				level: this.model.toJSON().level 
			};
			this.$el.html(template(data));
			this.input = this.$(".fieldsEdit");
			return this;
		},
		edit: function() {
			this.input.focus();
		},					
		enableEdit: function(el) {
			var editView = new PokemonEdit({model: this.model});
			this.$el.append(editView.render().el);							
		},
		duplicatePokemon: function(e) {
			Pokemons.create({
				name: this.model.toJSON().name, 
				level: this.model.toJSON().level
			});			
		},
		clear: function() {
			this.model.destroy();
		}
	});
	return PokemonView;
});