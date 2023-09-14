
const nodeCron = require('node-cron');
var task = nodeCron.schedule('* * * * * *', () => {
  // This job will run every second
  console.log(new Date().toLocaleTimeString());
}, {
  scheduled: false
});


module.exports = task