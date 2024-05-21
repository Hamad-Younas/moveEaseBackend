var express = require('express');
var router = express.Router();
const controller=require('../controller/GetInformation')

router.get('/', controller.GetInformation)
  
module.exports = router;