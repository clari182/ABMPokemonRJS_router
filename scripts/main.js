require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-optamd3-min',
	//handlebars: 'libs/handlebars',
    text: 'libs/require/text'
  }
});

require(['views/app', 'router'], function(AppView, Router){
  //var appView = new AppView;
	Router.initialize({appView: AppView});
});
