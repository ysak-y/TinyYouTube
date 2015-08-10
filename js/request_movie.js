
var request = require("request");
var cheerio = require("cheerio");

// Define request url

module.exports = {
	scrapeHTML: function (id){
		var requestUrl = "https://www.youtube.com/watch?v=" + id;

		// Send http request
		request({url: requestUrl}, function(error, response, body) {
		 
				// If request succeed
				if (!error && response.statusCode == 200) {
						$ = cheerio.load(body); // Create cheerio instance
		 
						// Get response data
						var url = response.request.href;
						var videos = [];

						$(".video-list-item").each(function(i, elem){
							
							var content = $(elem).children(".content-wrapper");
							var thumb = $(elem).children(".thumb-wrapper");

							if (content.length !== 0){
							
								var title = $(content).children().attr("title");
								var link = $(content).children().attr("href").split("=")[1];
								var author = $(content).children().children(".stat").children().text();
								
								var img_src = "http://i.ytimg.com/vi/" + link + "/default.jpg";

								var video = {
									"title": title,
									"link": link,
									"author": author,
									"src": img_src
								};
								
								videos.push(video);
							}

						}); 

						TN.model.set("videos", videos);
		 
				}
		 
				// If error occured
				else {
						console.log("--------------------------------------------------");
						if (error && "code" in error) {
								console.log("Error Code:" + error.code);
						}
						if (error && "errno" in error) {
								console.log("Error No:" + error.errno);
						}
						if (error && "syscall" in error) {
								console.log("Error Syscall:" + error.syscall);
						}
						if (response && "statusCode" in response) {
								console.log("Status Code:" +  response.statusCode);
						}
				}
		});
	}
};
