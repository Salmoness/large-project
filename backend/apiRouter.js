const express = require("express");
const apiRouter = express.Router();

const { cardsRouter } = require("./routes/cardsRouter.js");
const { usersRouter } = require("./routes/usersRouter.js");
const { testRouter } = require("./routes/test.js");
const { promptRouter } = require("./routes/prompt.js");

apiRouter.use("/users", usersRouter);
apiRouter.get("/test", testRouter);
apiRouter.use("/cards", cardsRouter);

module.exports = apiRouter;
