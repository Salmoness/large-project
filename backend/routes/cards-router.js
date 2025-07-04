const express = require('express');
const router = express.Router();

router.post('/add', require("./addcard.js"));
router.post('/search', require("./searchcards.js"));

module.exports = router;