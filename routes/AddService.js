var express = require('express');
var router = express.Router();
const controller=require('../controller/AddService');


router.post('/', controller.AddService)
  
module.exports = router;