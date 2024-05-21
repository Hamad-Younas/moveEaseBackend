var express = require('express');
var router = express.Router();
const controller=require('../controller/DeleteCompany');


router.delete('/', controller.DeleteCompany)
  
module.exports = router;