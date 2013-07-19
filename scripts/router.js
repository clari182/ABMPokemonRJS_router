  // Filename: router.js
  define([
    'jquery',
    'underscore',
    'backbone',
    'views/app',
		'views/pokemonNew',		
		'views/pokemonEditNew',
    'models/pokemon',
    'collections/pokedex'
    ], function($, _, Backbone,AppView, PokemonNewView, PokemonEditView, Pokemon,Pokedex) {
     
      var AppRouter = Backbone.Router.extend({
        routes: {
          "pokemon/:cid" : "viewPokemon",
          "pokemon/delete/:cid" : "deletePokemon",
          "search" : "searchPokemons",
					"newPokemon" : "newPokemon",
					"addPokemon": "addPokemon",
					"editPokemon": "editPokemon",
          "list": "defaultAction",         
					
          "*actions": "defaultAction"
        }
      });
      
			var initialize = function(){
				var appView = new AppView;
				var pokemonNewView = new PokemonNewView;
				var pokemonEditView = new PokemonEditView;
				var pokemons = new Pokedex;
				var router = new AppRouter;
				var currentView;									
				
				router.on('route:viewPokemon', function(cid) {
					if (currentView )  {
						currentView.remove();
					}
					currentView = pokemonEditView;
									
				 pokemonEditView.model = pokemons.get(cid);
				 pokemonEditView.render().$el.appendTo("#wildPokemons");			 		
			 });
			 
			 router.on('route:newPokemon', function(){
					if (currentView )  {
							currentView.remove();
					}
					currentView = pokemonNewView;
					
					pokemonNewView.model = null;
					pokemonNewView.render().$el.appendTo("#wildPokemons");
							
			 });
			 
			 router.on('route:addPokemon', function(){		
						
					var pokemon = pokemons.create({
							name: $("#pokemonName").val(),
							level:  $("#pokemonLevel").val()    
					});					
					currentView.remove();
					appView = new AppView;
					
					appView.collection = pokemons;
					appView.showPokemons();            
					
			 });
			 
			 router.on('route:editPokemon', function(){					
					var nameVal =  $(".txtName").val();
					if ( nameVal == "" ) currentView.model.clear();
					else {
						currentView.model.save({
							name: nameVal, 
							level: $(".txtLevel").val() 
						});
					};
					currentView.remove();
					//appView.showPokemons();
			 });
			
				router.on('route:deletePokemon', function(cid) {
						pokemon = pokemons.get(cid);
						pokemons.remove(pokemon);
						//pokemon.clear();
						//appView.showPokemons(); 					
				})

				router.on('route:defaultAction', function (actions) {
									
					pokemons.fetch({success :function(){
						appView.collection = pokemons;
						appView.showPokemons();            
					}});			
				});

					Backbone.history.start();
      };
      return { 
        initialize: initialize
      };
    });
		