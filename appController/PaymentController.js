const request = require('request');
const _ = require('lodash');
const {initializePayment, verifyPayment} = require('../config/paystack')(request);
const con = require('../config/database.js');

exports.index = function(req,res){

	res.render('index');
}

exports.handlePayment = function(req, res) {
    const form = _.pick(req.body,['amount','email','full_name']);
    form.metadata = {
        full_name : form.full_name
    }
    form.amount *= 100;
    
    initializePayment(form, (error, body)=>{
        if(error){
            //handle errors
            return res.redirect('/error')
        }
        response = JSON.parse(body);
        res.redirect(response.data.authorization_url)
    });
}


exports.handleCallback = function(req,res){
    const ref = req.query.reference;
    verifyPayment(ref, (error,body)=>{
        if(error){
            //handle errors appropriately
            console.log(error)
            return res.redirect('/error');
        }
        response = JSON.parse(body);        

        const data = _.at(response.data, ['reference', 'amount','customer.email', 'metadata.full_name']);

        [reference, amount, email, full_name] =  data;
        
        newDonor = {reference, amount, email, full_name};

        newDonor.amount = (newDonor.amount/100);
       	
       	var sql = "INSERT INTO donor (full_name, email, amount, reference) VALUES ('"+newDonor.full_name+"', '"+newDonor.email+"', '"+newDonor.amount+"', '"+newDonor.reference+"')";
		
		con.query(sql, function (err, result) {
			if (err){
				res.redirect('/error');
			}
			res.redirect('/receipt/'+result.insertId);
		});
    })
}

exports.receiptPage = function(req, res){
    const id = req.params.id;

    con.query("SELECT * FROM donor WHERE id = '"+id+"' ", function (err, result) {
	    if (err){
	    	res.redirect('/error')
	    }

	    res.render('success.ejs',{result});
  	});
}