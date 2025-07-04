const express = require('express');
const router = express.Router();

router.use("/users", require("./routes/users-router.js"));
router.get("/test", require("./routes/test.js"));
router.use("/cards", require("./routes/cards-router.js"));

module.exports = router;