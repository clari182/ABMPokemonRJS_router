define([
  'jquery', 
  'underscore', 
  'backbone',
	//'handlebars',
	'views/pokemonEdit',
  'text!templates/pokemonTemplate.html'
  ], function($, _, Backbone, /*Handlebars, */PokemonEdit, pokemonTemplate){
	
	var PokemonView = Backbone.View.extend({	
		tagName: 'tr',		
		template: _.template(pokemonTemplate),//Handlebars.compile(pokemonTemplate),
		events:{				
			"dblclick .view": "edit",
			"click .edit": "enableEdit",
			"click .destroy": "clear"	,
			//"keypress .fieldEdit": "updateOnEnter",
			"click .pokemonData": "enableEdit",
			"dblclick tr": "duplicatePokemon"
		},
		initialize: function() {
			var self = this;			
			_.bindAll(this, 'render');
			self.model.bind("change", self.render);
			self.model.bind("destroy", self.remove);
			this.model.view = this;
			
		},
		render: function() {
			$(this.el).empty();			
			$(this.el).html(this.template(this.model.toJSON()));			
			/*var source   = _.template(pokemonTemplate);
			var template = Handlebars.compile(source);
			var data = { 
				name: this.model.toJSON().name,
				level: this.model.toJSON().level 
			};
			this.$el.html(this.template(data));*/
			//this.input = this.$(".fieldsEdit");
			return this;
		},
		edit: function() {
			this.input.focus();
		},					
		enableEdit: function(el) {
			var editView = new PokemonEdit({model: this.model});
			$(this.el).append(editView.render().el);							
		},
		remove: function() {
			$(this.el).remove();
		},
		duplicatePokemon: function(e) {
			Pokemons.create({
				name: this.model.toJSON().name, 
				level: this.model.toJSON().level
			});			
		},
		clear: function() {
			this.model.clear();					
		}
	});
	return PokemonView;
});