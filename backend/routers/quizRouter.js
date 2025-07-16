const express = require("express");
const quizRouter = express.Router();

const { generateQuiz } = require("../routes/generateQuiz.js");
const {
  generatePlaygroundQuiz,
} = require("../routes/generatePlaygroundQuiz.js");
const { searchQuiz } = require("../routes/searchQuiz.js");

quizRouter.post("/generate", generateQuiz);
quizRouter.post("/generatePlayground", generatePlaygroundQuiz);
quizRouter.post("/search", searchQuiz);

module.exports.quizRouter = quizRouter;
