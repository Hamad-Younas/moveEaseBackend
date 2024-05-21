var express = require('express');
var router = express.Router();
const controller=require('../controller/DeleteInformation');


router.post('/', controller.DeleteInformation)
  
module.exports = router;