const bcrypt = require('bcryptjs');
const request = require('request');
const express = require('express');
const passport = require('passport');
const {sendSms, smsBalance, sendTokenSms, checkUnitBalance} = require('../config/sms')(request);
// const {sendSms} = require('@kidikudazi/smart-sms')(request);
const sgMail = require('@sendgrid/mail');
// set api key
sgMail.setApiKey('Api key');

const con = require('../config/database.js');

exports.loginUser = function(req, res, next){
	passport.authenticate('local', {
		successRedirect: '/admin/home',
		failureRedirect: '/admin',
		failureFlash: true
	})(req, res, next);
}

exports.home = function(req, res){
	// var form = {
	// 	username :'',
	// 	password : '',
	// 	message: "hello",
	// 	sender: "Sender Id",
	// 	recipient: "08060581863"
	// }
	// send sms
	// sendSms(form, (error, body)=>{
	// 	if(error){
	// 		console.log(error)
	// 	}else{
	// 		console.log('good', body);
	// 	}
	// });

	// check sms unit balance
	// var credentials = {
	// 	username:"sms usermane",
	// 	password:"sms password"
	// }

	// smsBalance(credentials, (error, body)=>{
	// 	if(error){

	// 	}else{
	// 		console.log('good', body);
	// 	}
	// })

	// send sms with token
	// var form = {
	// 	'sender': 'Sender Id',
	// 	'to' : '08060581863',
	// 	'message': 'Hello',
	// 	'type':'0',
	// 	'routing': 3,
	// 	'token':'Api Token'
	// }

	// sendTokenSms(form, (error, response)=>{
	// 	if(error){
	// 		console.log(error);
	// 	}else{
	// 		console.log('good', response);
	// 	}
	// });

	// check sms unit balance with token
	// var SMS_Token = 'API key';

	// checkUnitBalance(SMS_Token, (error, response)=>{
	// 	if(error){
	// 		console.log(error);
	// 	}else{
	// 		console.log('good', response);
	// 	}
	// });

	// send mail
	// const msg = {
	// 	to: 'jango',
	// 	from: 'me@email.com',
	// 	subject: 'Test',
	// 	text:'test',
	// 	//html:'<strong>Wow!</strong>'
	// }

	// sgMail.send(msg, (error,response)=>{
	// 	if (error) {
	// 		console.log(error);
	// 	}else{
	// 		console.log('response',response);
	// 	}
	// });

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
					res.render('admin/home', {donors, donations, donorList, paymentHistory});
				});
			});
		});		
	});
}