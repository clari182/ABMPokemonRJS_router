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
					
				/*var newAttributes = function() {
					return {
						name: $("#pokemonName").val(),
						level:  $("#pokemonLevel").val()    
					};
				};*/
				
				router.on('route:viewPokemon', function(cid) {
					if (currentView )  {
						currentView.remove();
					}
					currentView = pokemonEditView;
									
				 pokemonEditView.model = pokemons.get(cid);
				 pokemonEditView.render().$el.appendTo("#pokemonapp");			 		
			 });
			 
			 router.on('route:newPokemon', function(){
					if (currentView )  {
							currentView.remove();
					}
					currentView = pokemonNewView;
					
					pokemonNewView.model = null;
					pokemonNewView.render().$el.appendTo("#pokemonapp");
							
			 });
			 
			 router.on('route:addPokemon', function(){		
						
				var pokemon = pokemons.create({
						name: $("#pokemonName").val(),
						level:  $("#pokemonLevel").val()    
					});
					currentView.remove();
					appView.showPokemons(); 					
					//appView.create(pokemon);
			 });
			
				router.on('route:deletePokemon', function(cid) {
						pokemon = pokemons.get(cid);
						pokemons.remove(pokemon);
						//pokemon.clear();
						//currentView = appView;
						//appView.collection = pokemons;
						appView.showPokemons(); 					
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
		