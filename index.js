

"use strict";

var $ = require("jquery");
var material = require("./node_modules/material-design-lite/material.min.js");
var _ = require("underscore");
var Backbone = require("backbone");
var requestMovie = require("./js/request_movie.js");
var View = require("./js/view.js");
var Model = require("./js/model.js");


//TiNy
var TN = {}; 

// mediator for SearchField Events
TN.mediator = _.extend({}, Backbone.Events);

// movie player
TN.player;

// model for related videos
TN.model = new Model.Videos();

TN.mediator.listenTo(TN.mediator, "search", searchVideo);

// load YouTubeIframeAPI
var tag = document.createElement("script");
tag.src = "http://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


function onYouTubeIframeAPIReady() {
	TN.player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: '',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange,
			"onError": onError
		}
	});
	
	var relatedVideos = new View.RelatedVideos();
	var searchField = new View.SearchField();

}


// load video by id
function searchVideo(query){
	requestMovie.scrapeHTML(query);
	TN.player.loadVideoById({videoId:query});
}

// called when player ready
function onPlayerReady(event) {
	event.target.playVideo();
}

// called when player state change
function onPlayerStateChange(event) {
	if(event.data == YT.PlayerState.ENDED){
		// load new video when video end
		var id = TN.model.getRandomVideo();
		TN.player.loadVideoById({videoId:id});
	}
}

// called when error occured
function onError(event){
	console.log("error occured");
	switch(event.data){
		case 5:
			console.log("5 error");
			break;
		case 101:
			console.log("101 error");
			break;
		case 150:
			console.log("105 error");
			break;
	}
}

