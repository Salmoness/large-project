/* This is the /api/quiz/start endpoint.
 *
 * Its purpose is to generate a new "quiz game" for an already generated
 * quiz, and create an "access code" so that this new "quiz game" can
 * be played.
 *
 * UserAuthJWT IS required for this endpoint.
 */

import { verifyAndRefreshJWT } from "../utils/jwtService.js";
import { ObjectId } from "mongodb";
import {
  INTERNAL_ERROR,
  SUCCESS,
  UNAUTHORIZED,
} from "../utils/responseCodeConstants.js";

export async function startQuiz(req, res, next) {
  const { quizID, jwt } = req.body;

  const [jwtPayload, jwtRefreshStr, jwtVerified] = verifyAndRefreshJWT(jwt);
  if (!jwtVerified)
    return res.status(UNAUTHORIZED).json({ error: "JWT invalid or expired" });

  let code = Math.floor(Math.random() * 90000) + 10000;

  try {
    const result = await req.app.locals.mongodb
      .collection("QuizzGames")
      .insertOne({
        quiz_id: new ObjectId(quizID),
        in_progress: true,
        access_code: code, // an object array: [{question: "", options: [], correctAnswer: ""}, {question: "", options: [], correctAnswer: ""}, ...]
        created_by_id: jwtPayload.userId,
      });
    res.status(SUCCESS).json({
      accessCode: code,
      gameID: result.insertedId,
      error: "",
      jwt: jwtRefreshStr,
    });
  } catch (error) {
    console.error("Error starting quiz:", error);
    res
      .status(INTERNAL_ERROR)
      .json({ error: "Failed to start quiz", jwt: jwtRefreshStr });
    return;
  }
}
