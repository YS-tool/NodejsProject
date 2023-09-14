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


// var task = require("./config/cronjob")

// task.start()



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

//-----------------------------------------------------------------------------------
// outline for this branch

// 1: add mongo connector
// 2: add mongoose model
// 3: For example: when go to one page, write to database one record

// 4: have a user schema. For example when user click on one page, auto create one page. 
// 5: if possible, have a cron job clean the user collection


//-----------------------------------------------------------------------
// next branch
// UI for login, Add MFA is possible

// 1: create login UI and backend for user login
// 2: check cisco MFA or other MFA. Or google authenticator

//  "Remember this device" feature

// have a collection for user to play around


// use cookie
