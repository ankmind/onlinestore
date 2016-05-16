	# onlinestore
	onlinestore_miniproject

	Hi: Welcome to an online store for managing products.

	functionalities Provided:


	Authorisation:

	1. Sign up
	2. Sign in
	3. Sign out
	4. Change password


	Product:

	1. View all products.
	2. Search products.
	3. Remove product.
	4. Add product.
	5. Edit product.


	Lets see how you will make each and every call with example.


	Authorisation And User:

	1. Sign up : (POST CALL), URL:"/signup"

	What to send ?
	SEND JSON POST DATA : {
	"username": "ank",
	"password": 123,
	"mobile": 9654
	} 

	What to expect?
	JSON : {"value":"signup successfull","result":{"result":{"ok":1,"n":1},"ops":[{"_id":"abc","password":123,"mobile":9654,"token":"dd4d88de161f377ff5d594bd4ec7960191166d1d22a928749307ff4cea7e664282216de7a3ac1e84c15be09072b0f429"}],"insertedCount":1,"insertedIds":["abc"]}}


	2. Sign in : (GET CALL), URL:"/signin"

	What to send ?
	SEND "username" and "password" inside headers.

	What to expect?
	 JSON :
	 {"value":"success","token":"ee44db14ae512d80d56f46371c892a9661effb2daeebe8d2f3a725224036231c59857944b93f2d0479a4c41f9dd177f7"}


	3. Signout : (GET CALL), URL:"/signout"
	What to send ?
	SEND "username" and "token" inside headers.


	What to expect?
	 JSON :
	 {"value":"success"}


	4. Change Password  : (GET CALL), URL:"/changepassword"
	SEND "username" and "password" and "new password" inside headers.

	What to expect ?
	{"value":"success","token":"ee44db14ae512d80d56f46371c892a9661effb2daeebe8d2f3a725224036231c59857944b93f2d0479a4c41f9dd177f7"}



	PRODUCTS:

	Note: In every request for products for authentication inside "HEADERS" send :
	1."USERNAME"
	2."TOKEN"

	Apart from that details are discussed below.

	1. search : (GET CALL), URL:"/search" :

	What to send ?
	Inside headers send "SEARCHSTRING"

	What to expect ?
	JSON:
	{"value":"success","searchresult":[{"_id":"5739f2ef35f79c0c9a14dce7","name":"apple","type":" fruit","quantity":5},{"_id":"5739f30835f79c0c9a14dce9","name":"mango","type":" fruit","quantity":5},{"_id":"5739f31235f79c0c9a14dcea","name":"banana","type":" fruit","quantity":5}]}


	2.View (GET CALL),URL: "/View"

	No extra information to send you will get a list of all products.


	3.Edit (POST CALL),URL: "/edit"

	What to send?
	{
	"field": "name",
	"value": 123,
	"productid":"5739f2ef35f79c0c9a14dce7"
	}

	What to expect ?
	{"value":"success","result":{"ok":1,"nModified":1,"n":1}}


	4.Delete ? (POST CALL),URL: "/remove"

	What to send?
	{
	"productid":"5739f2ef35f79c0c9a14dce7"
	}

	What to expect ?
	{"value":"success","result":{"ok":1,"n":1}}


	5.Add  (POST CALL),URL: "/add"

	What to send?
	{
	"name":"milk",
	"type":"dairy",
	"quantity":10
	}

	What to expect ?
	{"value":"success","result":{"result":{"ok":1,"n":1},"ops":[{"name":"milk","quantity":10,"type":"dairy","_id":"573a4934448fac7803573237"}],"insertedCount":1,"insertedIds":["573a4934448fac7803573237"]}}



