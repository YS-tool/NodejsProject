var express= require('express');
var router = express.Router();
const User = require('../models/users');
const tracking = require('../models/tracking')

// var task = require("../config/cronjob")

router.get('/', async function(req,res){

  var currentStatus = new tracking({
    pageName:"indexPage"
  })

  await currentStatus.save()

  // task.stop()
  res.render('landing');
});



module.exports = router;