	var MongoClient = require('mongodb').MongoClient;
	var assert = require('assert');
	var ObjectId = require('mongodb').ObjectID;

	//mention mongodb url
	//put ip with running mongo db instance
	const ip ="localhost";
	var url="mongodb://"+ip+":27017/onlinestore";
    
    MongoClient.connect(url, function(err, db) {

	if(err){
	console.log("error connecting to database: "+err);
	}
     else{
	 console.log("Connected correctly to server.");
	}
	 exports.db=db; 
	});
   


