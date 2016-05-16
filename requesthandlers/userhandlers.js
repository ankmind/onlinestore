var database= require('../datahandlers/database');
var crypto =require('crypto');


function signin(requestdetails){
  crypto.randomBytes(48, function(err, buffer) {
  var token = buffer.toString('hex');
   database.db.collection('user').update({"_id":requestdetails.headers.username},{
   	$set:{
   	"token":token
   }
   },function(err){
   	 if(err){
   	 	requestdetails.response.write(JSON.stringify({"value":"failed"}));
   	 	requestdetails.response.end();
   	 }
   	 else{
   	 	requestdetails.response.write(JSON.stringify({"value":"success","token":token}));
   	 	requestdetails.response.end();
   	 }
   })
  });
}


function signout(requestdetails){
	database.db.collection('user').update({"_id":requestdetails.headers.username},{
   	$unset:{
   	"token":""
   }
   },function(err){
   	 if(err){
   	 	requestdetails.response.write(JSON.stringify({"value":"failed"}));
   	 	requestdetails.response.end();
   	 }
   	 else{
   	 	requestdetails.response.write(JSON.stringify({"value":"success"}));
   	 	requestdetails.response.end();
   	 }
   });
  }


function signup(requestdetails){

  var userdetails=requestdetails.postdata;
  var username=userdetails.username;
  var password=userdetails.password;
  var mobile =userdetails.mobile;

  var usercollection=database.db.collection('user');

  if(username==null){
      requestdetails.response.write(JSON.stringify({"value":"user name cannot` be null"}));
      requestdetails.response.end();
  }

  else{
  usercollection.find({"_id":username}).toArray(
   	function(err,result){
   	 if(err){
   	 	requestdetails.response.write(JSON.stringify({"value":"error occurred"}));
   	 	requestdetails.response.end();
   	 }
   	 else{
   	 	 if(result[0]!=null){
   	 	 	console.log(result);
   	 	 	requestdetails.response.write(JSON.stringify({"value":"user already exist"}));
   	 	 	requestdetails.response.end();
   	 	 }
   	 	 else{

       var token =crypto.randomBytes(48).toString('hex');
   	 	 usercollection.insert({"_id":username,"password":password,"mobile":mobile,"token":token},
   	 	 	function(err){
   	 	 		if(err){
   	 	 				requestdetails.response.write(JSON.stringify({"value":"error occured while signup"}));
   	 	 		}
   	 	 		else{
   	 	 			requestdetails.response.write(JSON.stringify({"value":"signup successfull"}));
   	 	 		}
   	 	 		requestdetails.response.end();
   	 	 	});   	 	 
   	   }
   	 }
   });
}
}


function changepassword(requestdetails){
var newpassword=requestdetails.headers.newpassword;
crypto.randomBytes(48, function(err, buffer) {
   var token = buffer.toString('hex');
   database.db.collection('user').update({"_id":requestdetails.headers.username},{
   	$set:{
   	"token":token,
   	"password":newpassword
   }
   },function(err){
   	 if(err){
   	 	requestdetails.response.write(JSON.stringify({"value":"failed"}));
   	 	requestdetails.response.end();
   	 }
   	 else{
   	 	requestdetails.response.write(JSON.stringify({"value":"success","token":token}));
   	 	requestdetails.response.end();
   	 }
   })
  });
}



exports.signin=signin;
exports.signout=signout;
exports.changepassword=changepassword;
exports.signup=signup;