var mongoose = require('mongoose');

// Doc for Mongoose Schemas: http://mongoosejs.com/docs/guide 
var Schema = mongoose.Schema;

/**
 * Note that the database was loaded with data from a JSON file into a
 * collection called gillers.
 */
var userSchema = new Schema(
    {
        type: {
            type: String, required: true, enum: ['student', 'tutor', 'admin']
        },
		username: {
            type: String, required: [true, 'Username required']
        },
		email: {
            type: String, required: [true, 'Email required'], unique: [true, 'Email already exists.']
        },
		password: {
            type: String, required: [true, 'Password required']
        },
        skills: {
            type: String, required: [true, 'Skills required']
        },
        zipcode: {
            type: String, required: [true, 'Zipcode required']
        },
        about: {
            type: String
        }
    },
    {
        collection: 'users'
    }
);

// Doc for Mongoose Connections: http://mongoosejs.com/docs/connections
// mongoose.connect('mongodb://localhost/usersdb');
mongoose.connect('mongodb://ds021650.mlab.com:21650/heroku_7tg73962');

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = mongoose.model('User', userSchema);
