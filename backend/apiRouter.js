const express = require("express");
const apiRouter = express.Router();

const { cardsRouter } = require("./routes/cardsRouter.js");
const { usersRouter } = require("./routes/usersRouter.js");
const { testRouter } = require("./routes/test.js");
const { quizRouter } = require("./routes/quizRouter.js");

apiRouter.use("/users", usersRouter);
apiRouter.get("/test", testRouter);
apiRouter.use("/cards", cardsRouter);
apiRouter.use("/quiz", quizRouter);

module.exports = apiRouter;
