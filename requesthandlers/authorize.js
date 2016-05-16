var database= require('../datahandlers/database');

exports.token = function(requestdetails,callback){
	var username=requestdetails.headers.username;
	var token=requestdetails.headers.token;

    if(username==null || token==null){
      requestdetails.response.write("authenticating details not present");
      requestdetails.response.end();
    }
    
    else{
    database.db.collection('user').find({"_id":username},{"token":1}).toArray(function(err,result){
       if(err)
       {
       	console.log("error while authenticating = " + err);
       	requestdetails.response.write(JSON.stringify({"value":"error while authentication details"}));
       	requestdetails.response.end();
       }   
       else if( token!=result[0].token){
       	requestdetails.response.write(JSON.stringify({"value":"invalid authentication details"}));
       	requestdetails.response.end();
       }
       else {
       	callback(requestdetails);
       }
    });
}
};
   
exports.credentials = function(requestdetails,callback) {

    var username=requestdetails.headers.username;
    var password=requestdetails.headers.password;

    database.db.collection('user').find({"_id":username},{"password":1}).toArray(function(err,result){
       if(err)
       {
       	console.log("error while authenticating = " + err);
       	requestdetails.response.write(JSON.stringify({"value":"error while authentication details"}));
       	requestdetails.response.end();
       }   
       else if(result[0]==null){

       	requestdetails.response.write(JSON.stringify({"value":"no such user exist"}));
       	requestdetails.response.end();
       }
       else if(result[0].password!=password){
       	requestdetails.response.write(JSON.stringify({"value":"invalid password"}));
       	requestdetails.response.end();
       } 
       else {
        console.log(result[0]);
       	callback(requestdetails);
       }
    });
};
