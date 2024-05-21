var express = require('express');
var router = express.Router();
const controller=require('../controller/DeleteMoveReq');


router.get('/Active', controller.UpdateMovReq)
router.get('/Inactive', controller.UpdateMovReqin)
  
module.exports = router;