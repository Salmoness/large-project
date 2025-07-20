/* This is the /api/quiz/history endpoint.
 *
 * Its purpose is to provide an array of quizGameIds, titles, summaries, and topics
 * of the quizzes in which the user (their id provided by the JWT) requests
 * and has completed.
 *
 * JWT authorization is required for this endpoint.
 */

import { COLLECTIONS } from "../utils/dbConstants.js";
import {
  BAD_REQUEST,
  INTERNAL_ERROR,
  UNAUTHORIZED,
  SUCCESS,
} from "../utils/responseCodeConstants.js";
import { verifyAndRefreshJWT } from "../utils/jwtService.js";

export async function quizHistory(req, res, next) {
  const { jwt } = req.body;

  const [jwtPayload, jwtRefreshStr, jwtVerified] = verifyAndRefreshJWT(jwt);
  if (!jwtVerified)
    return res.status(UNAUTHORIZED).json({ error: "JWT invalid or expired" });

  try {
    const db = req.app.locals.mongodb;
    const history = await db
      .collection(COLLECTIONS.QUIZ_SESSIONS)
      .aggregate([
        {
          $match: {
            user_id: jwtPayload.userId,
            is_completed: true, // Return only completed sessions
          },
        },
        {
          $lookup: {
            from: COLLECTIONS.QUIZ_GAMES,
            localField: "quiz_game_id",
            foreignField: "_id",
            as: "quiz_game",
          },
        },
        { $unwind: "$quiz_game" },
        {
          $lookup: {
            from: COLLECTIONS.QUIZZES,
            localField: "quiz_game.quiz_id",
            foreignField: "_id",
            as: "quiz",
          },
        },
        { $unwind: "$quiz" },
        {
          $project: {
            _id: 0,
            game_quiz_id: "$quiz_game_id",
            title: "$quiz.title",
            summary: "$quiz.summary",
          },
        },
      ])
      .toArray();
    res
      .status(SUCCESS)
      .json({ error: "", history: history, jwt: jwtRefreshStr });
  } catch (err) {
    console.log("Internal error for /api/quiz/history: " + err);
    res
      .status(INTERNAL_ERROR)
      .json({ error: "Internal error", jwt: jwtRefreshStr });
  }
}
