/* This is the /api/quiz/join endpoint.
 *
 * Its purpose is to start a quiz game session (play a quiz).
 *
 * UserAuthJWT is NOT required for this endpoint.
 * Generates and returns a QuizSessionJWT.
 */

import {
  createQuizSessionJWT,
  verifyAndRefreshJWT,
} from "../utils/jwtService.js";
import {
  INTERNAL_ERROR,
  SUCCESS,
  BAD_REQUEST,
} from "../utils/responseCodeConstants.js";

export async function joinQuiz(req, res, next) {
  const { username, accessCode, jwt } = req.body;

  // determine if a guest based on userAuthJWT
  // (don't bother refreshing it)
  var isGuest = false;
  const [jwtPayload, jwtRefreshStr, jwtVerified] = verifyAndRefreshJWT(jwt);
  if (!jwtVerified) {
    isGuest = true;
  }

  try {
    const quizGame = await req.app.locals.mongodb
      .collection("QuizzGames")
      .findOne({
        in_progress: true,
        access_code: parseInt(accessCode), // an object array: [{question: "", options: [], correctAnswer: ""}, {question: "", options: [], correctAnswer: ""}, ...]
      });
    if (!quizGame) {
      res
        .status(BAD_REQUEST)
        .json({ error: "Quiz not found or not in progress" });
      return;
    } else {
      let displayName = isGuest ? username.trim() : jwtPayload.username;

      const result = await req.app.locals.mongodb
        .collection("QuizzSessions")
        .insertOne({
          quiz_game_id: quizGame._id,
          user_id: isGuest ? "" : jwtPayload.userId,
          username: displayName,
          joined_at: new Date(),
          finished_at: null, // This will be set when the user ends the quiz
          is_completed: false,
          score: null,
        });

      const quiz = await req.app.locals.mongodb.collection("Quizzes").findOne({
        _id: quizGame.quiz_id,
      });

      const quizSessionJWTStr = createQuizSessionJWT(
        result.insertedId,
        displayName
      );

      res.status(SUCCESS).json({
        questions: quiz.questions,
        quiz_game_id: quizGame._id,
        jwt: quizSessionJWTStr,
        error: "",
      });
    }
  } catch (error) {
    console.error("Error joining quiz:", error);
    res.status(INTERNAL_ERROR).json({ error: "Failed to join quiz" });
    return;
  }
}
