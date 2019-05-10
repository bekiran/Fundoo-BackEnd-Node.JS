/************************************************************************************
 * @purpose   : Main entry point of Fundoo-notes application.
 * 
 * @file      : server.js
 * @overview  : import all required packages here.
 * @author    : bekiranabbi@gmail.com
 * @version   : 1.0
 * @since     : 04.03.2019
 * 
 *************************************************************************************/
/*******************************************
* Descp: To give the path to userRoute and noteRoute files
********************************************/
const noteRoute = require('./routes/noteRoutes');
const userRoute = require('./routes/userRoutes');
const noteService = require('./services/note.services')

/****************************************************************************************
 * descp :  CORS is a node.js package for providing a Connect/Express middleware 
 * that can be used to enable CORS with various options To enable Cross Origin Resource 
 * Sharing CORS.
 *****************************************************************************************/
var cors = require('cors')

/***********************************************************************************
 * descp: require express. Express is an nodejs framework
 ************************************************************************************/
const express = require('express');

//To support JSON-encoded bodies
const bodyParser = require('body-parser');

//creat express app
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    // res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});



var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('./config/database.config');


//parse request of content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//parse request of content-type-application / JSON.
app.use(bodyParser.json())

var expressValidator = require('express-validator')
app.use(expressValidator());
app.use(cors());
app.use('/', noteRoute);
app.use('/', userRoute);
//define the simple route
app.get('/', (req, res) => {
    res.json({ "message": "welcome to FundooNotes application. Take notes quickly, organize and keep track of all your notes" });
});



//listen for request
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
require('dotenv').config()
//configure the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;




//connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Sucessfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



//It allows you to schedule jobs (arbitrary functions) for execution at specific dates, with optional recurrence rules.
var schedule = require("node-schedule");
var j = schedule.scheduleJob("*/1 * * * * ", function () {
    noteService.checkForReminder();
});

module.exports = app;
