var User = require('../models/user');

/**
 * Adds a new user document to the database.
 *
 * @param {object} req request object
 * @param {object} res response object
 */

exports.getUserFromSession = function(req, res) {
	console.log("============= getUserFromSession =================");
	if (req.query.property) {
		var property = req.query.property.toLowerCase();
		User.find({type:property}, function(err,result){

			if(err){
				return res.send(err);
			}
			else{
				console.log(result);
				return res.send(result);
			}
		})
		//console.log(property);
	} 
	else {
		
	}
};