const bcrypt = require('bcryptjs');
const express = require('express');
const passport = require('passport');

exports.loginUser = function(req, res, next){
	passport.authenticate('local', {
		successRedirect: '/admin/home',
		failureRedirect: '/login',
		badRequestMessage: 'Your message you want to change.',
		failureFlash: true
	})(req, res, next);
	
	// passport.authenticate('local', function (error, user, info) {
 //      // this will execute in any case, even if a passport strategy will find an error
 //      // log everything to console
 //      console.log(error);
 //      console.log(user);
 //      console.log(info);

 //      if (error) {
 //        res.status(401).send(error);
 //      } else if (!user) {
 //        res.status(401).send(info);
 //      } else {
 //        next();
 //      }

      //res.status(401).send(info);
    //})(req, res);
}