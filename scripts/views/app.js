define([
  'jquery',
  'underscore', 
  'backbone',
	'router',
  'collections/pokedex',
	'collections/wildPokemons',
  'views/pokemon',
	'text!templates/list.html'
  ], function($, _, Backbone, Router, Pokedex, WildPokemonsList, PokemonView, ListTemplate){
			var AppView = Backbone.View.extend({
			el: $("#pokemonTable"),		
			
			events: {
				"click .delete" : "deletePokemon"
			},
			
			initialize: function() {							
				this.input = $("#newPokemon");			
				this.collection = Pokedex;				
			},
			
			render: function() {				
				return this;
			},
			
			newAttributes: function() {
				return {
					name: this.$("#pokemonName").val(),
					level:  this.$("#pokemonLevel").val()    
				};
			},
					
			showPokemons: function(){
					var  source = $("#pokedex").html();
					var items = this.collection.toJSON();
					var template = Handlebars.compile(ListTemplate);
					var html = template({pokemons: items});
					$(this.el).html(html);
			},					
			deletePokemon: function() {				
				this.trigger("deletePokemon");
			}
		});	
		return AppView;
	});