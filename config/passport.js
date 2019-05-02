const LocalStrategy = require('passport-local').Strategy;
const con = require('../config/database.js');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
	// Local strategy
	passport.use('local',new LocalStrategy({ 
	// or whatever you want to use
    usernameField: 'username',    // define the parameter in req.body that passport can use as username and password
    passwordField: 'password'
  },function(username, password, done){
		// Match username
		//let query = {username:username};
		let validateUsername = "SELECT * FROM admin WHERE username ='"+username+"'";
		
		con.query(validateUsername, function(err, user){
			if(err) throw err;
			if(!user)
			{
				return done(null, false, {message: 'No user found'});
			}else{
				if(user.length == 0)
				{
					return done(null, false, {message: 'No user found'});
				}
				// match password
				bcrypt.compare(password, user[0].password, function(err, isMatch){
					if (err) throw err;
					if (isMatch){

						return done(null, user);
					}else{
						return done(null, false, {message: 'Wrong Password'});
					}
				});
			}
		});

		/*User.findOne(query, function(err, user){
			if(err) throw err;
			if(!user)
			{
				return done(null, false, {message: 'No user found'});
			}else{
				// match password
				bcrypt.compare(password, user.password, function(err, isMatch){
					if (err) throw err;
					if (isMatch){
						return done(null, user);
					}else{
						return done(null, false, {message: 'Wrong Password'});
					}
				});
			}
		});*/
	}));

	passport.serializeUser(function(user, done){
		done(null, user[0].id);
	});

	passport.deserializeUser(function(id, done){
		let validateId = "SELECT * FROM admin WHERE id = "+id;
		con.query(validateId, function(err, user){
			done(err, user[0]);
		});
	});
}