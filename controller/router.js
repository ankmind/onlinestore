var path=require('../datahandlers/pathnames');
var authorize=require('../requesthandlers/authorize');
var requestdata=require('../datahandlers/requestdata');

function route(handle,pathname,response,postdata,headers) {
if (typeof handle[pathname] === 'function') {
     
    var requestdetails=requestdata(headers,response,postdata);
    
    switch(pathname) {
    case path.search:
    case path.edit:
    case path.remove:
    case path.add:
    case path.signout:
    case path.view: {
        authorize.token(requestdetails,handle[pathname]);
        break;
    }

    case path.changepassword:
    case path.signin:{
        authorize.credentials(requestdetails,handle[pathname]);
        break;
    }

    //includes cases which needs no authentication, all can be put in deafult
    case path.signup:{
    	handle[pathname](requestdetails);
    	break;
    }
   
    default :{
    	handle[pathname](requestdetails);
    }
  }
} 

else {
console.log("No request handler found for " + pathname);
response.writeHead(404, {"Content-Type": "text/plain"});
response.write("404 Not found");
response.end();
}
}

exports.route = route;