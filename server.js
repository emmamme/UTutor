// Server setup and start

var express = require('express');

// Get the index page:
app.get('/', function(req, res) {
    res.sendfile('index.html');
});


// Start the server
app.listen(3000);
console.log('Listening on port 3000');
