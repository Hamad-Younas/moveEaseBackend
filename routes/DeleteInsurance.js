var express = require('express');
var router = express.Router();
const controller=require('../controller/DeleteInsurance');


router.post('/', controller.DeleteInsurance)
  
module.exports = router;