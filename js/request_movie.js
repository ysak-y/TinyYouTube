
var Model = require("./model.js");
var request = require("request");
var cheerio = require("cheerio");


function scrapeHTML (id){

	var requestUrl = "https://www.youtube.com/watch?v=" + id;

	// Send http request
	request({url: requestUrl}, function(error, response, body) {
	 
			// If request succeed
			if (!error && response.statusCode == 200) {
					$ = cheerio.load(body); // Create cheerio instance
	 
					// Get response data
					var url = response.request.href;

					$(".video-list-item").each(function(i, elem){
						
						var content = $(elem).children(".content-wrapper");
						var thumb = $(elem).children(".thumb-wrapper");


						if (content.length !== 0){
						
							var title = $(content).children().attr("title");
							var link = $(content).children().attr("href").split("=")[1];
							var author = $(content).children().children(".stat").children().text();
							
							var img_src = "http://i.ytimg.com/vi/" + link + "/default.jpg";

							var video = new Model.Video({
								"title": title,
								"link": link,
								"author": author,
								"src": img_src
							});
							
							TN.model.add(video);
						}

					}); 
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

module.exports = {

	scrapeHTML: scrapeHTML

};
