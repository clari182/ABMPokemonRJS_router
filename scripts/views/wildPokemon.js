define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/wildPokemonTemplate.html'
  ], function($, _, Backbone, wildPokemonTemplate){
		var WildPokemonView = Backbone.View.extend({
		tagName: 'div',
			events:{
				"dragstart .view": "dragStart"			
			},
			initialize: function(){
				var self = this;
				self.listenTo(self.model, "change", self.render);
				self.listenTo(self.model, "destroy", self.remove);
			},
			render: function(){
				this.$el.empty();			
				var source   = _,template(wildPokemonTemplate);
				var template = Handlebars.compile(source);
				var data = { 
					name: this.model.toJSON().name,
					level: this.model.toJSON().level 
				};
				this.$el.html(template(data));
				return this;
			},
			dragStart: function(e){
				event.dataTransfer.setData("Text",event.target.id);
				pokemonAux = this.model;
			}
		});			
		return WildPokemonView;		
	
	});