var express = require('express');
var router = express.Router();
const controller=require('../controller/GetService')

router.get('/', controller.GetService)
  
module.exports = router;