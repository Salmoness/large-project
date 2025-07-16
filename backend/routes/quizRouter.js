const express = require("express");
const quizRouter = express.Router();

const { generateQuiz } = require("./generateQuiz.js");
const { generatePlaygroundQuiz } = require("./generatePlaygroundQuiz.js");
const { searchQuiz } = require("./searchQuiz.js");

quizRouter.post("/generate", generateQuiz);
quizRouter.post("/generatePlayground", generatePlaygroundQuiz);
quizRouter.post("/search", searchQuiz);

module.exports.quizRouter = quizRouter;