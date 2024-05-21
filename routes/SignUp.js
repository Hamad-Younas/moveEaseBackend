var express = require("express");
var router = express.Router();
const {SignUp,GetCompaniesName,GetCompaniesLocation} = require("../controller/SignUp");

router.post("/", SignUp);
router.get("/Names", GetCompaniesName);
router.get("/Locations", GetCompaniesLocation);

module.exports = router;
