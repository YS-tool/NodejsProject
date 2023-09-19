const mongoose = require("mongoose");

const TrackingData = new mongoose.Schema({
    userID:{
      type:String,
      default:"unknown"
    },
    pageName: String,
    browser:String,
    userOS:String,
  }
  ,{timestamps:true}
);

const Tracking = mongoose.model("Tracking", TrackingData);
module.exports = Tracking;