

var Video = Backbone.Model.extend({

	defaults: {

		title: "",
		link: "",
		author: "",
		src: ""
	
	}

});


var Videos = Backbone.Collection.extend({

	model: Video,
	
	getRandomVideo: function(){
		
		var len = this.models.length;
		var idx = parseInt(Math.random() * len);
		return this.at(idx).get("link");
	
	}

});

module.exports = {

	Video : Video,
	Videos: Videos

};
