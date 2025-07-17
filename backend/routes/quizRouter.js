const express = require("express");
const quizRouter = express.Router();

const { generateQuiz } = require("./generateQuiz.js");
const { generatePlaygroundQuiz } = require("./generatePlaygroundQuiz.js");
const { searchQuiz } = require("./searchQuiz.js");
const { startQuiz } = require("./startQuiz.js");
const { guestJoinQuiz } = require("./guestJoinQuiz.js");
const { submitQuiz } = require("./submitQuiz.js");
const { getQuizLeaderboard } = require("./getQuizLeaderboard.js");

quizRouter.post("/generate", generateQuiz);
quizRouter.post("/generatePlayground", generatePlaygroundQuiz);
quizRouter.post("/search", searchQuiz);
quizRouter.post("/start", startQuiz);
quizRouter.post("/guestJoin", guestJoinQuiz);
quizRouter.post("/submit", submitQuiz);
quizRouter.post("/leaderboard", getQuizLeaderboard);

module.exports.quizRouter = quizRouter;