// Require modules
const express = require('express');
const app = express();
const session = require('express-session');
const readConfig = require('jsonfile').readFileSync;
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const passportConfig = require('./app/config/passport');
const authentication = require('./app/middleware/authentication');
const authRoutes = require('./app/routes/auth');
const appRoutes = require('./app/routes/app');
const s3FileUpload = require('./app/multipleupload/multiupload');
const { promisify } = require('util')
const cors = require('cors');

app.use(cors());

// Internal modules - APIs, Database
const input = require('./routes/controllers/input/main');
const output = require('./routes/controllers/output/main');
const dbms = require('./dbms/config/connect');

// Load config file
try {
    var config = readConfig("config.json");
} catch (e) {
    console.log("Error: Server config not found");
    return process.exit(-1);
}

// Global variable
global.__ENV_LIST = config.ENVIRONMENTS;
global.__DATABASE = config.CITIZENS_APP_DATABASE;
global.__CONNECT = null;
global.__CONSTANTS = require("./utils/constants");

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/routes/views');
app.set('view engine', 'ejs');


passportConfig(passport);

// Application

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 
app.use(authentication());

// Include Auth and APP routes
authRoutes(app, passport); 
appRoutes(app); 

// Include API routers
app.use('/input', input);
app.use('/output', output);

let router = require('./app/routes/upload.router.js');
app.use('/', router);
app.use('/api', s3FileUpload);

//Database Init
if (__DATABASE.enable == true) {
    try {
        // connect to database
    } catch (err) {
        console.log("Database Initialization Failed "+ err);
    }
}

const server = async () => {
    const port = config.PORT || 3000
    await promisify(app.listen).bind(app)(port)
    console.log("Citizens App Interface");
    console.log('Current Port:', config.PORT);
};
server();
server.timeout = 60 * 60 * 1000;

/** CitizensApp init**/
const twitter = require('./lib/twitter');

const onStart = function () {

};

onStart();