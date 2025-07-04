const express = require('express');
const router = express.Router();

router.post('/login', require("./login.js"));
router.post('/register', require("./register.js"));

module.exports = router;