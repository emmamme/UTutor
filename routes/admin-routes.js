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
			let email_old = data[i].email_old
			let email = data[i].email
			let password = data[i].password	
			let type = data[i].type
			let about = data[i].about
			let zipcode = data[i].zipcode
			let skills = data[i].skills
			let username = data[i].username
			User.update({"email": email},{$set: {"password":password,"about":about,"type":type,"username":username,"email":email,"zipcode":zipcode,"skills":skills}},function (err, result) {
		   });
		}
	}
}

exports.updatepw= function(req, res) {
	console.log("============= updateuser =================");
	console.log(req.body)
	let data = req.body.data
	if(data){
		for(let i=0; i<data.length; i++){
			let email = data[i].email
			let password = data[i].password	
			User.update({"email": email},{$set: {"password":password}},function (err, result) {
				if(err){
					res.send(err);
				}
				else{
					res.send("Update Successful");
				}
		   });
		}
	}
}

exports.rmuser = function(req,res) {
	console.log("============= removeuser =================");
	
	let data = req.body.data
	if(data){
		for(let i=0; i<data.length; i++){
			let email = data[i].email
			console.log(email)
			User.remove({"email":email},function (err, result) {
				if(err){
					res.send(err);
				}
				else{
					res.send("Remove Successful");
				}
			});
		}
	}
}

exports.init = function(req, res) {

	User.remove({},function (err){
		if (err){

			res.send(err);
		}
		else{
			var data = {
			"type": "admin",
			"username": "admin",
			"email": "admin@ututor.com",
			"password": "admin",
			"skills": "admin",
			"zipcode": "m3c 2z3",
			"about": ""
			};
			var newAdmin = new User(data);
			newAdmin.save(function(error, newAdmin) {
				console.log("============= Initiate Admin Account =============");
				var response;
				if (error) {
					if (error.name === 'MongoError' && error.code === 11000) {
						response = "Email already exists."
					}
					else if (error.name === 'ValidationError') {
						response = error.errors[Object.keys(error.errors)[0]].message;
					}
				}
				else {
					response = "Success";
				}

				console.log(response);
			})
			res.send("Initialize data Successfully");
		}
	});
	
}











