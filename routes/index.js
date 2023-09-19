var express= require('express');
var router = express.Router();
const tracking = require('../models/tracking')

// var task = require("../config/cronjob")

router.get('/', async function(req,res){
  // task.stop()
  res.render('landing');
});



module.exports = router;