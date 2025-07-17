const express = require("express");
const apiRouter = express.Router();

const { usersRouter } = require("./usersRouter.js");
const { testRouter } = require("../routes/test.js");
const { quizRouter } = require("./quizRouter.js");

apiRouter.use("/users", usersRouter);
apiRouter.get("/test", testRouter);
apiRouter.use("/quiz", quizRouter);

module.exports = apiRouter;
