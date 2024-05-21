var express = require('express');
var router = express.Router();
const controller=require('../controller/UpdateProfile');


router.post('/', controller.UpdateProfile)
  
module.exports = router;