define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/pokemonEditTemplate.html'
  ], function($, _, Backbone, pokemonEditTemplate){
	
		var PokemonEdit = Backbone.View.extend({
			tagName: 'div',				
			events: {		
				'click #editPokemon': 'savePokemon',
				'keypress .fieldEdit': 'updateOnEnter'
			},
			initialize: function() {
				var self = this;			
			},
			render: function() {		
				$(".fieldsEdit").parent().remove();
				var source = _.template(pokemonEditTemplate);
				var template = Handlebars.compile(source);
				var data = this.model.toJSON();
				this.$el.html(template(data));			
				return this;
			},
			savePokemon: function(e) {
				var nameVal = this.$(".editName").val();
				var levelVal = this.$(".editLevel").val();
				if ( nameVal == "" ) this.clear();
				else {
					this.model.save({
						name: nameVal, 
						level: levelVal 
					});
				}		
			},
			updateOnEnter: function(e) {
				 if (e.keyCode == 13) this.savePokemon(e);
			}
		});
		return PokemonEdit;
	});