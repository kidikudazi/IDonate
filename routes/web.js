const express = require('express');
const router = express.Router();
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
router.post('/admin/login', AdminController.loginUser);

module.exports = router;