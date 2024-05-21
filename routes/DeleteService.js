var express = require('express');
var router = express.Router();
const controller=require('../controller/DeleteService');


router.post('/', controller.DeleteService)
  
module.exports = router;