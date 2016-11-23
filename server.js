// Server setup and start

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');

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

// Get the index page:
app.get('/', function(req, res) {
    res.sendfile('index.html');
});

app.post('/user', user.addUser);
app.get('/user', user.getUser);
app.get('/userinsession', user.getUserFromSession);
app.get('/admin',admin.getUserFromSession)

// Start the server
app.listen(3000);
console.log('Listening on port 3000');
