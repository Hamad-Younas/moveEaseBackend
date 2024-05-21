var express = require("express");
var router = express.Router();
const controller = require("../controller/AddMoveRequest");

router.post("/", controller.AddMoveRequest);

module.exports = router;
