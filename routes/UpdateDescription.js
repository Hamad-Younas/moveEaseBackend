var express = require('express');
var router = express.Router();
const controller=require('../controller/UpdateDescription');


router.post('/', controller.UpdateDescription)
  
module.exports = router;