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