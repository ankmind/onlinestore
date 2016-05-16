var server = require("./controller/server");
var router = require("./controller/router");
var userhandlers=require("./requesthandlers/userhandlers");
var producthandlers=require("./requesthandlers/producthandlers");
var path=require('./datahandlers/pathnames');
var database= require('./datahandlers/database');
var handle = {};

handle[path.search] = producthandlers.search;
handle[path.remove] = producthandlers.remove;
handle[path.edit] = producthandlers.edit;
handle[path.add]=producthandlers.add;
handle[path.view]=producthandlers.view;

handle[path.signup]=userhandlers.signup;
handle[path.signin] =userhandlers.signin;
handle[path.signout]=userhandlers.signout;
handle[path.changepassword]=userhandlers.changepassword;


server.start(router.route, handle);


//written for checking purposes add any url of your choice below
handle['/'] = function(requestDetails){
	requestDetails.response.write("Welcome to Home");
	requestDetails.response.end();
}


handle['/allproducts'] = function(requestdetails){
var productcollection=database.db.collection('product');
  productcollection.find({}).toArray(
   	function(err,result){
   	 if(err){
   	 	requestdetails.response.write(JSON.stringify({"value":"error occurred"}));
   	 }
   	 else{
   	 	 requestdetails.response.write(JSON.stringify({"value":result}));
   	}
   	requestdetails.response.end();
   });
}


handle['/allusers'] = function(requestdetails){
  var usercollection=database.db.collection('user');
  usercollection.find({}).toArray(
   	function(err,result){
   	 if(err){
   	 	requestdetails.response.write(JSON.stringify({"value":"error occurred"}));
   	 }
   	 else{
   	 	 requestdetails.response.write(JSON.stringify({"value":result}));
   	}
   	requestdetails.response.end();
   });
}