var express = require('express');
var router = express.Router();
const controller=require('../controller/UpdateLogo');


router.post('/', controller.UpdateLogo)
  
module.exports = router;