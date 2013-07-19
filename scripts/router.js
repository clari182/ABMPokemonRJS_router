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
				 pokemonEditView.on("editPokemon", function(pokemon){
						pokemonEditView.model.save(pokemon);							
						router.navigate("", { trigger:true });
					});					
			 });
			 
			 router.on('route:newPokemon', function(){
					if (currentView )  {
							currentView.remove();
					}
					currentView = pokemonNewView;
										
					pokemonNewView.render().$el.appendTo("#wildPokemons");
					pokemonNewView.on("savePokemon", function(pokemon){
						pokemons.create(pokemon);							
						router.navigate("", { trigger:true });
					});
			 });			 		 			
			
				router.on('route:deletePokemon', function(cid) {
						appView.on("deletePokemon", function(){
							var pokemon = pokemons.get(cid);
							pokemons.remove(pokemon);
							//pokemon.destroy();
							
						});
						var pokemon = pokemons.get(cid);
						pokemons.remove(pokemon);
						router.navigate("", { trigger: true });
						
				})

				router.on('route:defaultAction', function (actions) {
					currentView = appView;				
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
		