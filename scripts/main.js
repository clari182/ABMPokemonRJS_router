//$(function() {	

	require(["lib/jquery", "lib/underscore", "lib/backbone", "lib/handlebars","lib/handlebars"], function(){
	
	//Models
	var pokemonAux = null;
	var Pokemon = Backbone.Model.extend( {
		defaults: function() {
			return {
				"name":"No name",
				"level":"1"
			};
		},		
		initialize: function() {
			if ( !this.get("name")) this.set({"name": this.defaults().name});			
			if ( !this.get("level")) this.set({"level": this.defaults().level});		
		}
	});


	//Collections - like a list of instances of a Model
	var Pokedex = Backbone.Collection.extend({
		model: Pokemon,
		comparator: "level",
		localStorage: new Backbone.LocalStorage("pokemons-backbone")
		
	});
	
	var WildPokemons = Backbone.Collection.extend({
		model: Pokemon,
		localStorage: new Backbone.LocalStorage("wildPokemons-backbone")
		
	});
	var Pokemons = new Pokedex;
	var WildPokemonsList = new WildPokemons;
	
	
//Views
	
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
			var source = $("#edit-template").html();
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
			var source   = $("#item-template").html();
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
			var source   = $("#wild-item-template").html();
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
	
	var WildPokemonListView = Backbone.View.extend({
		tagName: 'div',
		events:{
		},
		initialize: function(){
		},
		render: function(){
		}
	});	

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

	var Router = Backbone.Router.extend({
		routes: {			
			"*action": "func",
			"foo/:bar" : "paramtest"			
		},
		 initialize:function () {
			$('#main').html(new AppView().render().el);
		},
		func: function (action) { 
			console.log(action);
		},
		paramtest: function(p) {
			console.log(p);
		}
	});
	var app = new Router();
	Backbone.history.start(); //Needs to be called to check for changes in the url	
	});
//});
