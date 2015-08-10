

"use strict";

var $ = require("jquery");
var material = require("./bower_components/material-design-lite/material.min.js");
var _ = require("underscore");
var Backbone = require("backbone");
var requestMovie = require("./lib/request_movie.js");
var View = require("./lib/view.js");
var Model = require("./lib/model.js");

var TN = {};
TN.mediator = _.extend({}, Backbone.Events);
TN.player;
TN.model = new Model();

TN.mediator.listenTo(TN.mediator, "search", searchVideo);

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
			'onStateChange': onPlayerStateChange
		}
	});
	
	var relatedVideos = new View.RelatedVideos();
	var searchField = new View.SearchField();

}

function searchVideo(query){
	requestMovie.scrapeHTML(query);
	TN.player.loadVideoById({videoId:query});
}

function onPlayerReady(event) {
	event.target.playVideo();
}

function onPlayerStateChange(event) {
	if(event.data == YT.PlayerState.ENDED){
		var id = TN.model.getRandomVideo();
		TN.player.loadVideoById({videoId:id});
	}
}

