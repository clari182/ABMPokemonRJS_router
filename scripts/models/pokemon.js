define(['underscore', 'backbone'], function(_, Backbone) {
	var Pokemon = Backbone.Model.extend( {
		urlRoot: 'http://localhost:3000/pokemons/',
		defaults: {
				//"id": "",
				"name":"No name",
				"level":"1"		
		},		
		initialize: function() {
			//if ( !this.get("id")) this.set({"id": this.defaults().id});				
			if ( !this.get("name")) this.set({"name": this.defaults().name});			
			if ( !this.get("level")) this.set({"level": this.defaults().level});		
		},		
    clear: function() {
      this.destroy();
      this.view.remove();
    }
	});
	return Pokemon;
});