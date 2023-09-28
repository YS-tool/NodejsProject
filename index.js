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

