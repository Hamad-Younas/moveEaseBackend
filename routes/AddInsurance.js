var express = require('express');
var router = express.Router();
const controller=require('../controller/AddInsurance');


router.post('/', controller.AddInsurance)
  
module.exports = router;