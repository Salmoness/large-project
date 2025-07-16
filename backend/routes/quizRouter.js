const express = require("express");
const quizRouter = express.Router();

const { generateQuiz } = require("./generateQuiz.js");
const { generatePlaygroundQuiz } = require("./generatePlaygroundQuiz.js");

quizRouter.post("/generate", generateQuiz);
quizRouter.post("/generatePlayground", generatePlaygroundQuiz);

module.exports.quizRouter = quizRouter;