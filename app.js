const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

const app = express();

// load view engine
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public/')));


let webRoute = require('./routes/web');


app.use('/', webRoute);

// set port
const port = process.env.PORT || 5000;

// start server
app.listen(port, function(){
	console.log(`Server started on port ${port}...`);
});