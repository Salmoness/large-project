const express = require("express");
const quizRouter = express.Router();

const { generateQuiz } = require("../routes/generateQuiz.js");
const { generatePlaygroundQuiz} = require("../routes/generatePlaygroundQuiz.js");
const { searchQuiz } = require("../routes/searchQuiz.js");
const { startQuiz } = require("../routes/startQuiz.js");
const { guestJoinQuiz } = require("../routes/guestJoinQuiz.js");
const { submitQuiz } = require("../routes/submitQuiz.js");
const { getQuizLeaderboard } = require("../routes/getQuizLeaderboard.js");

quizRouter.post("/generate", generateQuiz);
quizRouter.post("/generatePlayground", generatePlaygroundQuiz);
quizRouter.post("/search", searchQuiz);
quizRouter.post("/start", startQuiz);
quizRouter.post("/join", guestJoinQuiz);
quizRouter.post("/submit", submitQuiz);
quizRouter.post("/leaderboard", getQuizLeaderboard);

module.exports.quizRouter = quizRouter;