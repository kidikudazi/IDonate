const express = require('express');
const router = express.Router();
const passport = require('passport');
const PaymentController = require('../appController/PaymentController');
const AdminController = require('../appController/AdminController');

// get index page
router.get('/', PaymentController.index ); 

// send payment request
router.post('/paystack/pay', PaymentController.handlePayment);

// get callback from payment
router.get('/Payment/Callback', PaymentController.handleCallback);

// get receipt page
router.get('/receipt/:id', PaymentController.receiptPage);

// get the error page
router.get('/error', (req, res)=>{
    res.render('error.ejs');
});

// get the admin login page
router.get('/admin', (req, res)=>{
	res.render('admin/login');
});

// login admin
router.post('/admin', AdminController.loginUser);

// admin home
router.get('/admin/home', isAuth, AdminController.home);


// logout admin
router.get('/admin/logout', isAuth, (req, res)=>{
	req.logout();
	req.flash('success', 'You are logged out')
	res.redirect('/');
});

// authenticate user
function isAuth(req, res, next){
	if (req.isAuthenticated()){
		return next();
	}else{
		req.flash('danger', 'Please Login');
		res.redirect('/');
	}
}

module.exports = router;