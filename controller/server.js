var http = require("http");
var url = require("url");

function start(route,handle) {

function onRequest(request, response) {
var pathname = url.parse(request.url).pathname;
console.log("Request for " + pathname + " received.");

if(request.method=='POST'){
var postdata = "";	

request.addListener("data", function(postdatachunk) {
 if (postdata.length > 1e5) { 
  //attack
   postdata = "";
   response.writeHead(413, {'Content-Type': 'text/plain'}).end();
   request.connection.destroy();
  }
postdata += postdatachunk;
});


request.addListener("end", function() {
    var error=null;
	try{
		postdata=JSON.parse(postdata);
	}
	catch(err){
		error=err;
		response.write(JSON.stringify({"value":"format of post data incorrect"}));
		response.end();
	}
     
	if(error==null)
    route(handle, pathname, response, postdata,request.headers);
});
}

else{
 route(handle, pathname, response,"",request.headers);
}
}

var port =Number(process.env.PORT || 3000);
http.createServer(onRequest).listen(port);
console.log("Server has started.");
}

exports.start = start;