const bcrypt = require('bcryptjs');
const express = require('express');
const passport = require('passport');

exports.loginUser = function(req, res, next){
	passport.authenticate('local', {
		successRedirect: '/admin/home',
		failureRedirect: '/admin',
		failureFlash: true
	})(req, res, next);
}

exports.home = function(req, res){
	res.render('admin/home');
}