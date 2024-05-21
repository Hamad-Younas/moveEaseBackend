var express = require('express');
var router = express.Router();
const controller=require('../controller/AddInformation');


router.post('/', controller.AddInformation)
  
module.exports = router;