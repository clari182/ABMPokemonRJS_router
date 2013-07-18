define([
  'jquery',
  'underscore', 
  'backbone',
	'router',
  'collections/pokedex',
	'collections/wildPokemons',
  'views/pokemon'
  ], function($, _, Backbone, Router, Pokedex, WildPokemonsList, PokemonView){
			var AppView = Backbone.View.extend({
			el: $("#pokemonapp"),		
			
			events: {
				"keypress .txtPokemon": "createOnEnter",
				"click #addPokemon": "create",
				"click #clear-completed": "clearCompleted",
				"dragover #pokedex": "dragOver",
				"drop #pokedex": "drop"
			},
			
			initialize: function() {
				_.bindAll(this, 'addOne', 'addAll', 'render');
				
				this.input = $("#newPokemon");			
				this.collection = Pokedex;
				this.collection.bind("add", this.addOne);
				WildPokemonsList.bind("add", this.addOneWild);
				this.collection.bind("reset", this.addAll);
				this.collection.bind("all", this.render);
				//this.main = $("#main");
				
				//Pokedex.fetch();
				//WildPokemonsList.fetch();
			},
			
			showPokemons: function(){
				for ( var i = 0; i < Pokedex.length; i++) {
					
				}
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
			
			addOne: function(pokemon) {
				var view = new PokemonView({model: pokemon});			
				$("#pokedex").append(view.render().el);		
			},
			
			addOneWild: function(pokemon) {
				var view = new WildPokemonView({model: pokemon});			
				$("#wildPokemons").append(view.render().el);		
			},
			
			addAll: function() {
				this.collection.each(this.addOne);
				WildPokemonsList.each(this.addOneWild);
			},
			
			createOnEnter: function(e) {
				if ( e.keyCode != 13 ) return;
				if ( !this.$("#pokemonName").val()) return;
				this.collection.create(this.newAttributes());
				//this.input.val("");					
			},
			
			create: function () {
				var pokemon = this.collection.create(this.newAttributes());
				this.$("#pokemonName").val("");
				this.$("#pokemonLevel").val("");
				this.addOne(pokemon);
			},
			
			clearCompleted: function() {
				return false;
			},
			dragOver: function(ev){
				event.preventDefault();
			},
			drop: function(ev) {
				event.preventDefault();
				var data=event.dataTransfer.getData("Text");
				var pokemon = $("#"+data);
				var el = $('<\li>').append(pokemon);
				var $ul = event.target.parentElement;
				var pokemonName = data;
				var pokemonLevel = pokemon.find("label[name=level]").html();
				
				var newPokemon = this.collection.create({
					name: pokemonName,
					level: pokemonLevel
				});		
				pokemonAux.clear();					
			},
			createWildPokemons: function(){
					WildPokemonsList.create({
						name: "Ponyta",
						level: "12"
					});
					WildPokemonsList.create({
						name: "Sulfura",
						level: "64"
					});
					WildPokemonsList.create({
						name: "Mewtoo",
						level: "100"
					});
					WildPokemonsList.create({
						name: "Ratata",
						level: "5"
					});
					WildPokemonsList.create({
						name: "Magicarp",
						level: "8"
					});
			}
			
		});	
		return AppView;
	});