define(['underscore', 'backbone'], function(_, Backbone) {
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
	return Pokemon;
});