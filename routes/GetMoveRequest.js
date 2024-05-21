var express = require('express');
var router = express.Router();
const controller=require('../controller/GetMoveRequest')

router.get('/', controller.GetMoveRequests)
router.get('/Active', controller.GetMoveRequestsCountActive)
router.get('/Inactive', controller.GetMoveRequestsCountinactive)
router.get('/Pending', controller.GetMoveRequestsCountpending)
router.get('/Count', controller.GetMoveRequestsCount)
router.get('/Filter', controller.FilterMoveRequests)
router.get('/Search', controller.GetMoveRequest)
router.get('/Location', controller.GetMoveRequestsLocations)
  
module.exports = router;