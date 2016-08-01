var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	username: String,
	password: String,
	email: String,
	address: String,
	fname: String,
	lname: String,
	role: String
});