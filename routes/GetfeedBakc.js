var express = require('express');
var router = express.Router();
const controller=require('../controller/GetFeedBack.js');


router.get('/', controller.FeedBack)
router.get('/getAll', controller.GetFeedBack)
  
module.exports = router;