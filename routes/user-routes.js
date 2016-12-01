"use strict"
var User = require('../models/user');

/**
 * Adds a new user document to the database.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.addUser = function(req, res) {
	console.log("============= addUser =============");
	console.log(req.body);
	
	req.assert('email', 'Invalid email address').isEmail();
	req.assert('username', 'Invalid username (must be alphanumeric)').isAlphanumeric();
	req.assert('password', 'Password is too short').isLength({min: 4});
	req.assert('password', 'Password must be alphanumeric').isAlphanumeric();
	req.assert('skills', 'Invalid Skills').isSkills();
	req.assert('zipcode', 'Invalid zip code address').isZipcode();
	req.assert('about', 'About is too long').isLength({max: 2000});
	
	

	var errors = req.validationErrors();
	if (errors) {
		return res.send(errors[0].msg);
	}
	
	var newUser = new User(req.body);

	newUser.save(function(error, newUser) {
		var response;
        if (error) {
			if (error.name === 'MongoError' && error.code === 11000) {
				resposne = "Email already exists."
			}
			else if (error.name === 'ValidationError') {
				resposne = error.errors[Object.keys(error.errors)[0]].message;
			}
		}
		else {
			resposne = "Success";
			req.session.email = req.body.email;
			req.session.username = req.body.username;
			req.session.type = req.body.type;
		}

        res.send(resposne);
    })
};

/**
 * Gets a user document to the database.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.getUser = function(req, res) {
	console.log("============= getUser =================");
	User.findOne({email: req.query.email}, function(err, user) { 
		if (err) {
			console.log(err);
			return res.send(err);
		}
		
		if (user) {
			if(req.query.password == user.password) {
				req.session.email = user.email;
				req.session.username = user.username;
				req.session.type = user.type;
				return res.send(user.type);
			}
			else {
				return res.send("Wrong password");
			}
		}
		else {
			return res.send("Email does not exist.");
		}
	});
};

/**
 * Gets user in session if exists.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.getUserFromSession = function(req, res) {
	console.log("============= getUserFromSession =================");
	if (req.session.email) {
		return res.json({
			username: req.session.username,
			type: req.session.type,
			email: req.session.email
        });
	} else {
		return res.json({
			username: "",
			type: "",
			email: ""
        });
	}
};



exports.getTutorFromSession = function(req, res) {
	console.log("============= Tutor=================");
	if (req.session.email) {
		var infor = req.session.email;
		User.find({email:infor}, function(err,result){
			if(err){
				return res.send(err);
			}
			else{
				console.log(result);
				return res.send(result);
			}
		})
		
	} 
	
};


exports.getTutors = function(req,res){
	console.log("============= getTutors =================");
	if (req.query.skill){
		var skill = req.query.skill;
		console.log(skill);
		User.find({$and:[{type: 'tutor'},{skills: {$regex: ".*"+skill+".*"}}]}, function(err,user){
			if(err){
				return res.send(err);
			}
			else{
				console.log(user);
				return res.send(user);
			}
		});
	}
	else{
		var tutor = req.query.tutor;
		console.log(tutor);
		User.find({$and: [{type: 'tutor'},{username: tutor}]},function(err,user){
			if(err){
				return res.send(err);
			}
			else{
				return res.send(user);
			}
		})
	}
};


exports.updateprofile = function(req,res){

	console.log(req.body)
	let data = req.body.data
	if(data){
		
			let email = data.email
			let password = data.password	
			let about = data.about
			let zipcode = data.zipcode
			let skills = data.skills
			let username = data.username
			User.update({"email": email},{$set: {"password":password,"about":about,"username":username,"email":email,"zipcode":zipcode,"skills":skills}},function (err, result) {
		   });
		
	}
}

exports.updateLike = function(req,res){
	console.log('============= updateLike =================');
	var email = req.query.email;

	User.findOne({email:email},function(err,user){
		if(err){
			return res.send(err);
		}
		else{
			console.log(user); 

			user['like'] += 1;
			console.log(user['like']);
			user.save(function(err){
				if (err){
					return res.send(err);
				}
				else{
					console.log("like has been updated");
					return res.send(user);
				}
			})
		}
	});
};

exports.updateDislike = function(req,res){
console.log('============= updateDislike =================');
	var email = req.query.email;

	User.findOne({email:email},function(err,user){
		if(err){
			return res.send(err);
		}
		else{
			console.log(user); 

			user['dislike'] += 1;
			console.log(user['dislike']);
			user.save(function(err){
				if (err){
					return res.send(err);
				}
				else{
					console.log("dislike has been updated");
					return res.send(user);
				}
			})
		}
	});
};
/**
 * User logout - empty session
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.logout = function(req, res) {
	console.log("============= logout =================");
	req.session = null;
	res.sendfile('index.html');
};

exports.email = function(req, res) {
	console.log("============= Email =================");
	console.log(req.body);
	
	var nodemailer = require('nodemailer');

	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport('smtps://csc309.ututor@gmail.com:ututor.csc309@smtp.gmail.com');

	// setup e-mail data with unicode symbols
	var mailOptions = {
		to: req.body.toemail, // list of receivers
		subject: req.body.subject, // Subject line
		text: "A message sent by " + req.body.fromemail + ":\n" + req.body.body // plaintext body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			return res.send(error);
		}
		return res.send("Success");
	});
	
	
};

