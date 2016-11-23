var User = require('../models/user');

/**
 * Adds a new user document to the database.
 *
 * @param {object} req request object
 * @param {object} res response object
 */

exports.getUserFromSession = function(req, res) {
	console.log("============= getUserFromSession =================");
	if (req.query) {
		//console.log(req.query)
	} else {
		
	}
};