const express = require("express");
const apiRouter = express.Router();

const { cardsRouter } = require("./routes/cardsRouter.js");
const { usersRouter } = require("./routes/usersRouter.js");
const { testPage } = require("./routes/test.js");

apiRouter.use("/users", usersRouter);
apiRouter.get("/test", testPage);
apiRouter.use("/cards", cardsRouter);

module.exports = apiRouter;
