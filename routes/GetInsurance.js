var express = require('express');
var router = express.Router();
const controller=require('../controller/GetInsurance')

router.get('/', controller.GetInsurance)
  
module.exports = router;