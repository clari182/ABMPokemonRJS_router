define([
  'jquery',
  'underscore', 
  'backbone',
  'collections/pokedex',
	'collections/wildPokemons',
  'views/pokemon'
  ], function($, _, Backbone, Pokemons, PokemonView){
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
			this.input = $("#newPokemon");			
			
			this.listenTo(Pokemons, "add", this.addOne);
			this.listenTo(WildPokemonsList, "add", this.addOneWild);
			this.listenTo(Pokemons, "reset", this.addAll);
			this.listenTo(Pokemons, "all", this.render);
			this.main = $("#main");
			
			Pokemons.fetch();
			WildPokemonsList.fetch();
		},
		
		render: function() {
			//this.$el.empty();
			this.main.show();
			return this;
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
			Pokemons.each(this.addOne, this);
			WildPokemonsList.each(this.addOneWild, this);
		},
		
		createOnEnter: function(e) {
			if ( e.keyCode != 13 ) return;
			if ( !this.$("#pokemonName").val()) return;
			Pokemons.create({
				name: this.$("#pokemonName").val(), 
				level: this.$("#pokemonLevel").val()
			});
			this.input.val("");					
		},
		
		create: function () {
			Pokemons.create({
				name: this.$("#pokemonName").val(),
				level: this.$("#pokemonLevel").val()
			});
			this.$("#pokemonName").val("");
			this.$("#pokemonLevel").val("");
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
			
			var newPokemon = Pokemons.create({
				name: pokemonName,
				level: pokemonLevel
			});		
			pokemonAux.destroy();					
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