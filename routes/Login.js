var express = require("express");
var router = express.Router();
const controller = require("../controller/Login");

router.post("/", controller.Login);
router.post("/Admin", controller.LoginAdmin);
router.get("/Count", controller.CompanyCount);
router.get("/All", controller.AllCompany);

module.exports = router;
