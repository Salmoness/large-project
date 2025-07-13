const express = require("express");
const router = express.Router();


const { verifyEmail } = require("./routes/verifyEmail.js");

router.use("/users", require("./routes/users-router.js"));
router.get("/test", require("./routes/test.js"));
router.use("/cards", require("./routes/cards-router.js"));
router.post("/verify-email", verifyEmail);

module.exports = router;