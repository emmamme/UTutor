"use strict"

var User = require('../models/user');
       


/**
 * Adds a new user document to the database.
 *
 * @param {object} req request object
 * @param {object} res response object
 */

exports.getUserFromSession = function(req, res) {
	console.log("============= getUserFromSession =================");
	if (req.query.infor) {

		var infor = req.query.infor.toLowerCase();
		User.find({$or:[{username:infor}, {email:infor}]}, function(err,result){

			if(err){
				return res.send(err);
			}
			else{
				console.log(result);
				return res.send(result);
			}
		})
		
	} 
	else {
		console.log("shit");
	}
};


exports.updateuser = function(req, res) {
	console.log("============= updateuser =================");
	console.log(req.body)
	let data = req.body.data
	if(data){
		for(let i=0; i<data.length; i++){
			let email = data[i].email
			let password = data[i].password		
			User.update({"email": email},{$set: {"password":password}},function (err, result) {
	 
		      
		   });
		}
	}
}











