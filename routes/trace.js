var express= require('express');
var router = express.Router();
const tracking = require('../models/tracking')

// this page do not need get function. 

// router.get('/', async function(req,res){
//     res.send("called trace get")
// });


router.post('/', async function(req,res){

    var currentStatus = new tracking({
        pageName   : req.body.pageName,
        browser    : req.body.browser,
        userOS     : req.body.userOS,
    })
    await currentStatus.save()
});


module.exports = router;