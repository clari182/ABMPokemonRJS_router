  // Filename: router.js
  define([
    'jquery',
    'underscore',
    'backbone',
    'views/app',
		'views/pokemonNew',
    'models/pokemon',
    'collections/pokedex'
    ], function($, _, Backbone,AppView, PokemonView, Pokemon,Pokedex) {
     
      var AppRouter = Backbone.Router.extend({
        routes: {
          "pokemon/:cid" : "viewPokemon",
          "pokemon/delete/:cid" : "deletePokemon",
          "search" : "searchPokemons",
					"addPokemon" : "addPokemon",
          "list": "defaultAction",         
					
          "*actions": "defaultAction"
        }
      });
      
			var initialize = function(){
			var appView = new AppView;
			var pokemonView = new PokemonView;
			var pokemons = new Pokedex;
			var router = new AppRouter;
			var currentView;
        

			router.on('route:viewPokemon', function(cid) {
				if (currentView )  {
					currentView.remove();
				}
				currentView = pokemonView;
				
				
			 pokemonView.model = pokemons.get(cid);
			 pokemonView.render().$el.appendTo("#pokedex");			 
		
		 });
		 
		 router.on('route:addPokemon', function(){
			
		 });

			/*router.on('route:paginatePokemons', function() {
				$('#pokedex').html('<a href="#" id="leak">Test</a>');
			 $('#leak').on('click', function(){ console.log('test')})            
					appView.showPokemons();
			})*/

			router.on('route:deletePokemon', function(cid) {
					pokemon = pokemons.get(cid);
					pokemons.remove(pokemons.get(cid));
					
					pokemon.destroy();
					//appView.addAll();
					currentView.render().$el.appendTo("#pokemonapp");
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
		