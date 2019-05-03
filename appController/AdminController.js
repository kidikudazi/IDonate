const bcrypt = require('bcryptjs');
const express = require('express');
const passport = require('passport');
const con = require('../config/database.js');

exports.loginUser = function(req, res, next){
	passport.authenticate('local', {
		successRedirect: '/admin/home',
		failureRedirect: '/admin',
		failureFlash: true
	})(req, res, next);
}

exports.home = function(req, res){
	// get the total donors
	var totalDonors = "SELECT COUNT(DISTINCT full_name) FROM donor";

	con.query(totalDonors, (err, donors)=>{
		if(err) res.render('/admin');

		var totalDonation = "SELECT SUM(amount) FROM donor";
		con.query(totalDonation, (err, donations)=>{

			var totalDonorList = "SELECT DISTINCT full_name, email FROM donor";

			con.query(totalDonorList, (err, donorList)=>{

				if (err) throw err;

				var getPaymentHistory = "SELECT full_name, email, amount, reference FROM donor";

				con.query(getPaymentHistory, (err, paymentHistory)=>{
					if(err) throw err;
					console.log(paymentHistory);
					res.render('admin/home', {donors, donations, donorList, paymentHistory});
				});
			});
		});		
	});
}