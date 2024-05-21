var express = require('express');
var router = express.Router();
const controller=require('../controller/GetOpeningHours')

router.get('/', controller.GetOpeningHours)
  
module.exports = router;