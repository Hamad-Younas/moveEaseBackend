var express = require('express');
var router = express.Router();
const controller=require('../controller/UpdateOpeningHours');


router.post('/', controller.UpdateOpeningHours)
  
module.exports = router;