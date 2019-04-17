const express = require('express');
const router = express.Router();
const PaymentController = require('../appController/PaymentController');

// get index page
router.get('/', PaymentController.index ); 

// send payment request
router.post('/paystack/pay', PaymentController.handlePayment);

// get callback from payment
router.get('/Payment/Callback', PaymentController.handleCallback);

// get receipt page
router.get('/receipt/:id', PaymentController.receiptPage);

router.get('/error', (req, res)=>{
    res.render('error.ejs');
})

module.exports = router;