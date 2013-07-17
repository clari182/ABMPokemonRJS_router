define([
  'jquery', 
  'underscore', 
  'backbone',
	//'handlebars',
  'text!templates/pokemonEditTemplate.html'
  ], function($, _, Backbone, /*Handlebars, */pokemonEditTemplate){
	
		var PokemonEdit = Backbone.View.extend({
			//tagName: 'tr',				
			template: _.template(pokemonEditTemplate),
			events: {		
				'click .editPokemon': 'savePokemon',
				'keypress .fieldEdit': 'updateOnEnter'
			},
			initialize: function() {
				var self = this;			
				_.bindAll(self, 'render', 'savePokemon');
				self.model.bind('change', self.render);
				self.model.view = self;
			},
			render: function() {		
				//$(".fieldsEdit").parent().remove();
				/*var source = _.template(pokemonEditTemplate);
				var template = Handlebars.compile(source);*/
				var data = this.model.toJSON();
				//$(this.el).parent().hide();				
				$(this.el).html(this.template(data));							
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