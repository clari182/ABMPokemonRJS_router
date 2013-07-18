  // Filename: router.js
  define([
    'jquery',
    'underscore',
    'backbone',
    'views/app',
    'models/pokemon',
    'collections/pokedex'
    ], function($, _, Backbone,AppView,Pokemon,Pokedex) {
     
      var AppRouter = Backbone.Router.extend({
        routes: {
          "pokemon/:cid" : "viewPokemon",
          "pokemon/delete/:cid" : "deletePokemon",
          "search" : "searchPokemons",
          "list": "defaultAction",         
					
          "*actions": "defaultAction"
        }
      });
      
      var initialize = function(){
        var appView = new AppView;
        var pokemons = new Pokedex;
        var router = new AppRouter;
		var currentView;
        

        router.on('route:viewPokemon', function(cid) {
         appView.model = pokemons.get(cid);
         appView.showPokemon();
      
       })

        router.on('route:paginatePokemons', function() {
          $('#pokedex').html('<a href="#" id="leak">Test</a>');
         $('#leak').on('click', function(){ console.log('test')})            
            appView.showPokemons();
        })

        router.on('route:deletePokemon', function(cid) {
            pokemon = pokemons.get(cid);
            pokemons.remove(pokemon);
            pokemon.destroy()
            appView.showPokemons();
        })

        router.on('route:defaultAction', function (actions) {
        
		pokemons.fetch({success :function(){
              appView.collection = pokemons;
              //currentView.render();
              //appView.showPokemons();
			  appView.addAll();
              //currentView.render().$el.appendTo("#pokedex");
        }});
  });

        Backbone.history.start();
      };
      return { 
        initialize: initialize
      };
    });
		