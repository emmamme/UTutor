// Server setup and start

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var expressValidator = require('express-validator');

var user = require('./routes/user-routes');
var admin = require('./routes/admin-routes');
var app = express();

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/'));

// Set up to use a session
app.use(cookieParser());
app.use(session({
    secret: 'CSC309groupOne'
}));

// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// We have to create custom validators:
// Notice that customValidators is an object with methods defined for
// each of the inputs we want to validate separately.
app.use(expressValidator({
    customValidators: {

	isZipcode: function(value) {
		return value.search( /[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]/ ) !== -1;
        },
	isSkills: function(value) {
		if (value.search( /^[0-9a-zA-Z ]{1,20}(,[0-9a-zA-Z ]{1,20})*$/ ) !== -1) {
			var array = value.split(',');
			var noEmptyValue = true;
			array.forEach(function(part, index, theArray) {
				theArray[index] = theArray[index].trim();
				console.log("Length: "+ theArray[index].length);
				if (theArray[index].length < 1) {
					noEmptyValue = false;
					return;
				}
			});
			return noEmptyValue;
		}
		else {
			return false;
		}
        }
        
    }
})); // This line must be immediately after express.bodyParser()!

// Initiate Admin Account
var User = require('./models/user');
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


// Get the index page:
app.get('/', function(req, res) {
    res.sendfile('index.html');
});

app.post('/user', user.addUser);
app.get('/user', user.getUser);
app.get('/userinsession', user.getUserFromSession);
app.get('/userprofile', user.getUserInfo);
app.get('/logout', user.logout);
app.post('/email', user.email);
app.get('/updateLike', user.updateLike);
app.get('/updateDislike', user.updateDislike);
app.get('/tutors',user.getTutors);

app.get('/admin',admin.getUserFromSession);
app.post('/updatepw',admin.updatepw);
app.get('/init',admin.init);
app.post('/update',admin.updateuser);
app.post('/rm',admin.rmuser);
app.post('/updatepw',admin.updateuser);
app.post('/updateprofile', user.updateprofile);
app.post('/userByAdmin', user.addUserByAdmin);



// Start the server
app.listen(3000);
console.log('Listening on port 3000');
