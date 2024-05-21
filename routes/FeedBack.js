var express = require('express');
var router = express.Router();
const controller=require('../controller/feedback');


router.post('/', controller.FeedBack)
  
module.exports = router;