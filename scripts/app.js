define(['backbone', 'jquery', 'Router','bootstrap'], function(Backbone, $,  Router, bootstrap) {
  var initialize = function(){     
    Router.initialize();
  };

  return { 
    initialize: initialize
  };
});


