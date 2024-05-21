var express = require('express');
var router = express.Router();
const controller=require('../controller/SendEmail');


router.get('/', controller.sendEmail)
  
module.exports = router;