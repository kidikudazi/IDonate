const _ = require('lodash');
const con = require('../config/database.js');

exports.loginUser = function(req, res){
	const form = _.pick(req.body,['username', 'password']);

	var username = form.username;
	var password = form.password;

	console.log(username);
}