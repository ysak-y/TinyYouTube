

var RelatedVideo = Backbone.View.extend({
	
	tagName: "div",

	initialize: function(video){
		
		this.title = video.get("title");
		this.link = video.get("link");
		this.author = video.get("author");
		this.src = video.get("src");

		_.bindAll(this, "render");
		this.render();

	},

	events: {
		
		"click": "search"	
	
	},
	
	render: function(){
	
		this.$el.attr("id", this.link);
		this.$el.attr("class", "mdl-navigation");

		var img = document.createElement("img");
		img.src = this.src;
		img.setAttribute("class", "thumb");
		
		var div = document.createElement("div");
		var title_div = div.cloneNode(false);
		title_div.setAttribute("class", "thumbTitle");

		var author_div = div.cloneNode(false);
		author_div.setAttribute("class", "thumbAuthor");

		title_div.appendChild(document.createTextNode(this.title));
		author_div.appendChild(document.createTextNode(this.author));

		div.appendChild(title_div);
		div.appendChild(author_div);
		
		this.el.appendChild(img);
		this.el.appendChild(div);
		return this;
	
	},
	
	search: function(){
	
		TN.mediator.trigger("search", this.link);
	}

});

var RelatedVideos = Backbone.View.extend({

	el: "#relatedVideos",
	
	initialize: function(){

		this.listenTo(TN.model, "add", this.render);
			_.bindAll(this, "render");

	},
	
	render: function(){

		this.$el.children().remove();
		var videos = TN.model.models;
	
		for(var v in videos){
		
			var relatedVideo = new RelatedVideo(videos[v]);
			this.el.appendChild(relatedVideo.el);
			
		}

		return this;
	
	}

});

var SearchField = Backbone.View.extend({

	el: ".searchField",
	
	initialize: function(){
		
		_.bindAll(this, "render");
	
	},
	
	events: {
	
		"keydown": "search"
	
	},

	search: function(e){

		if(e.keyCode === 13){
		
			var query = this.$el.val();
			TN.mediator.trigger("search", query);
		
		}
	}

});

module.exports = {
	
	SearchField : SearchField,
	RelatedVideos : RelatedVideos,
	RelatedVideo : RelatedVideo

};

