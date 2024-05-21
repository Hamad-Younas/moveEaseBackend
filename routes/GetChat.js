const express = require('express');
const router = express.Router();
const { GetChat } = require('../controller/GetChat');

router.get('/',  GetChat);

module.exports = router;
