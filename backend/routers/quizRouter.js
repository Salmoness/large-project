const express = require("express");
const quizRouter = express.Router();

const { generateQuiz } = require("../routes/generateQuiz.js");
const { generatePlaygroundQuiz } = require("../routes/generatePlaygroundQuiz.js");
const { searchQuiz } = require("../routes/searchQuiz.js");
const { startQuiz } = require("../routes/startQuiz.js");
const { joinQuiz } = require("../routes/joinQuiz.js");
const { submitQuiz } = require("../routes/submitQuiz.js");
const { getQuizLeaderboard } = require("../routes/getQuizLeaderboard.js");
const { quizInfo } = require("../routes/quizInfo.js");
const { quizHistory } = require("../routes/quizHistory.js");
const { searchGame } = require("../routes/searchGame.js")

quizRouter.post("/generate", generateQuiz);
quizRouter.post("/generatePlayground", generatePlaygroundQuiz);
quizRouter.post("/search", searchQuiz);
quizRouter.post("/start", startQuiz);
quizRouter.post("/join", joinQuiz);
quizRouter.post("/submit", submitQuiz);
quizRouter.post("/leaderboard", getQuizLeaderboard);
quizRouter.post("/info", quizInfo);
quizRouter.post("/history", quizHistory);
quizRouter.post("/searchGame", searchGame);

module.exports.quizRouter = quizRouter;
