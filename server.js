// server.js

var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var server   = require('http').Server(app);
var io       = require('socket.io')(server);

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');
var port     = process.env.PORT || 8888;         // set the port


    // configuration ===============================================================
    mongoose.connect(configDB.url);
    var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function (callback) {
 console.log("connection to mongo database successful.");
 });
   require('./config/passport')(passport); // pass passport for configuration
    app.use(morgan('dev')); // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(bodyParser());

    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    //app.use(methodOverride());

    app.set('view engine', 'ejs'); // set up ejs for templating
                 // set the static files location /public/img will be /img for users

    // required for passport
    app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session


    // routes ======================================================================
    require('./app/routes.js')(app,passport);
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users


    // listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("App listening on port : " + port);
