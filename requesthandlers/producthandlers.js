var database= require('../datahandlers/database');
var ObjectId=require('mongodb').ObjectId;


function search(requestdetails){
var productcollection =database.db.collection('product');
var searchstring=requestdetails.headers.searchstring;

if(searchstring=="" || searchstring==null || searchstring.length<3){
	requestdetails.response.write(JSON.stringify({"value":"improper search details"}));
	requestdetails.response.end();
}

else{ 
       productcollection.find({$or:[{"name":{$regex : ".*"+searchstring+".*"}},
        {"type":{$regex : ".*"+searchstring+".*"}}] }).toArray(function(err,res){

   	 if(err){
   	 	requestdetails.response.write(JSON.stringify({"value":"failed"}));
   	 	requestdetails.response.end();
   	 }
   	 else{
   	 	requestdetails.response.write(JSON.stringify({"value":"success","searchresult":res}));
   	 	requestdetails.response.end();
   	 }
   });
  }
}


function view(requestdetails){
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


function remove(requestdetails){
var productcollection =database.db.collection('product');
var productid=requestdetails.postdata.productid;
console.log(productid);
productid= new ObjectId(productid);

     productcollection.remove({"_id":productid},function(err,res){
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


function edit(requestdetails){
 var productcollection =database.db.collection('product');

 var product=requestdetails.postdata;
 var productid  =  product.productid;
 var field = product.field;
 var value = product.value;
 productid= new ObjectId(productid);

     productcollection.update({"_id":productid},{
     	$set:{
     		[field]:value
     	}
     }
     	,function(err,res){
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


function add(requestdetails){
	var productcollection =database.db.collection('product');
	var product=requestdetails.postdata;
	var productname=product.name;
	var productquantity=product.quantity;
	var producttype=product.type;

     productcollection.insert({"name":productname,"quantity":productquantity,
      "type":producttype}
     	,function(err,res){
   	 if(err){
   	 	requestdetails.response.write(JSON.stringify({"value":"failed"}));
   	 	requestdetails.response.end();
   	 }
   	 else{
   	 	requestdetails.response.write(JSON.stringify({"value":"success","result":res}));
   	 	requestdetails.response.end();
   	 }
   });
}


exports.search = search;
exports.edit = edit;
exports.remove=remove;
exports.add=add;
exports.view=view;