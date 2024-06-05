const config = require("platformsh-config").config();
const passport = require('passport');
const express = require('express');
const app = express(); 
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MONGOuri = "mongodb+srv://YS_self:9QSpVoQcduhVPaVl@selfwebsite.dqqhad2.mongodb.net/";

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static( __dirname+'/public'))

//express session
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave:true
}));

// For error message
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(MONGOuri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites:true,
    w:"majority"
  }
);

// routes
app.use('/', require("./routes/index"));
app.use('/trace', require("./routes/trace"));
app.use('/techInfo', require("./routes/techInfo"));


// var task = require("./config/cronjob")

// task.start()



// var CryptoJS = require("crypto-js");

// // You only need to mess with the following variables.
// const sKey = ""; // IE: "abc123def456hij789abc123def456hij789"
// const iKey = ""; // IE: "ABCDEF123456789"
// const host = request.url.split("/")[2].toLowerCase(); // IE: "api-xxxxxxxx.duosecurity.com"
// const path = request.url.replace(/^.*\/\/[^\/]+/, ''); // IE: "/admin/v1/users"

// //
// // End user variables.
// //

// var bodyParams = request.data || [];

// // Sort the params
// const paramKeys = Object.keys(bodyParams).sort();
// var params = [];
// for(var i = 0; i < paramKeys.length; i++) {
//     var key = paramKeys[i];
//     var value = bodyParams[key];
//     params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
// }
// var paramString = params.join('&');

// const content_type = 'application/x-www-form-urlencoded';
// const method = request.method.toUpperCase();

// // create canonical string
// var date = new Date().toUTCString();
// var canon = [date, method.toUpperCase(), host.toLowerCase(), path, paramString].join('\n');

// // sign canonical string
// var sig  = CryptoJS.HmacSHA1(canon, sKey);

// // Build Headers
// var auth =  `${iKey}:${sig}`;
// var base64 = Buffer.from(auth).toString('base64');





// start server
if(config.inRuntime()){
  // Get PORT and start the server
  app.listen(config.port, function() {
    console.log(`Listening on port ${config.port}`);
  });
}else{
  app.listen(5555, function() {
    console.log(`Listening on port 5555`);
  });
}

