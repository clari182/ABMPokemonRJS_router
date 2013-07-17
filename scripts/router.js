  // Filename: router.js
  define([
    'jquery',
    'underscore',
    'backbone',
    'views/app',
    'models/pokemon',
    'collections/pokedex'
    ], function($, _, Backbone,GlobalView,Pokemon,Pokedex) {
     
      var AppRouter = Backbone.Router.extend({
        routes: {
          "pokemon/:cid" : "viewPokemon",
          "pokemon/delete/:cid" : "deletePokemon",
          "search" : "searchPokemons",
          "list": "defaultAction",
          "list/page/:page": "paginatePokemons",
					
          "*actions": "defaultAction"
        }
      });
      
      var initialize = function(){
        var globalView    = new GlobalView,
        pokemons       = new Pokedex,
        app_router  = new AppRouter,
        currentPage,currentView;
        

        app_router.on('route:viewPokemon', function(cid) {
         globalView.model = pokemons.get(cid);
         globalView.showPokemon();
      
       })

        app_router.on('route:paginatePokemons', function(page) {
          $('#mainContainer').html('<a href="#" id="leak">Test</a>');
         $('#leak').on('click', function(){ console.log('test')})
            currentPage = page;
            globalView.showPokemons(page);
        })

        app_router.on('route:deletePokemon', function(cid) {
            pokemon = pokemons.get(cid);
            pokemons.remove(pokemons.get(cid));
            pokemon.destroy()
            globalView.showPokemons(currentPage);
        })

        app_router.on('route:defaultAction', function (actions) {
         
        
          
           
        /* pokemons.fetch().complete(function(){
              globalView.collection = pokemons;
              //currentView.render();
              globalView.showPokemons();
              //currentView.render().$el.appendTo("#mainContainer");
        });*/
  });

        Backbone.history.start();
      };
      return { 
        initialize: initialize
      };
    });
		