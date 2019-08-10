const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


const app = express();

// load view engine
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public/')));

// Express session middleware
app.use(session({
	secret: 'Keyboard cat',
	resave: true,
	saveUninitialized:true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function(req, res, next){
	res.locals.messages = require('express-messages')(req, res);
	next();
});


// Express Validtor Middleware
app.use(expressValidator({
	errorFormatter: function(param, msg, value){
		var namespace = param.split('.')
		, root = namespace.shift()
		, formParam = root;

		while(namespace.length){
			formParam += '['+ namespace.shift() + ']';
		}
		return {
			param : formParam,
			msg : msg,
			value : value
		};
	}
}));

// passport config
require('./config/passport')(passport);

// Passport Middleware
app.use(passport.initialize());

app.use(passport.session());

app.get('*', function(req, res, next){
	res.locals.user = req.user || null;
	next();
});

let webRoute = require('./routes/web');


app.use('/', webRoute);

// set port
const port = process.env.PORT || 3000;

// start server
app.listen(port, function(){
	console.log(`Server started on port ${port}...`);
});