// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var http=require('http');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var  swig=require('swig');
var passport = require('passport');
var flash    = require('connect-flash');
var app      = express();
var server_socket= http.createServer(app).listen(8080);
var io= require('socket.io').listen(server_socket);

// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration



// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views',__dirname+'/views');
app.use(express.static('./public'));// set up ejs for templating
 
// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes.js')(app, passport,io);
require('./app/comunicacionserver.js')(app,io); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
//app.listen(port);
console.log('The magic happens on port ' +"8080");
