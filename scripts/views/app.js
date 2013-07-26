define([
  'jquery',
  'underscore', 
  'backbone',
	'router',
  'collections/pokemons',
	'collections/wildPokemons',
  'views/pokemon',
	'text!templates/list.html'
  ], function($, _, Backbone, Router, Pokemons, WildPokemonsList, PokemonView, ListTemplate){
			var AppView = Backbone.View.extend({
			el: $("#pokemonTable"),		
			
			events: {
				"click .delete" : "deletePokemon"
			},
			
			initialize: function() {							
				this.input = $("#newPokemon");			
				this.collection = Pokemons;				
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
					var  source = $("#pokemons").html();
					var items = this.collection.toJSON();
					var template = Handlebars.compile(ListTemplate);
					console.log(items);
					var html = template({pokemons: items});
					$(this.el).html(html);
			},					
			deletePokemon: function() {				
				this.trigger("deletePokemon");
			}
		});	
		return AppView;
	});