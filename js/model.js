
var Model = Backbone.Model.extend({
	defaults: {
		videos: []
	},
	getRandomVideo: function(){
		var len = this.get("videos").length;
		var idx = parseInt(Math.random() * len);
		return this.get("videos")[idx].link;
	}
});

module.exports = Model;

