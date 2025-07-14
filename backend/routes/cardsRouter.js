const express = require("express");
const cardsRouter = express.Router();

cardsRouter.post("/add", require("./addcard.js"));
cardsRouter.post("/search", require("./searchcards.js"));

module.exports.cardsRouter = cardsRouter;
