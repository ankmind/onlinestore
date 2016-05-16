module.exports =function(headers,response,postdata){
  return new requestdata(headers,response,postdata);
}


function requestdata(headers,response,postdata){
	this.headers=headers;
	this.response=response;
	this.postdata=postdata;
}
