/* This is the /api/quiz/leaderboard endpoint.
 *
 * Its purpose is to provide an array of usernames, sorted in order of
 * number of correct answers, with tie breaking being determined by
 * the amount of time it took for them to finish the quiz.
 *
 * JWT authorization is NOT needed for this endpoint.
 */

import { ObjectId } from "mongodb";
import { COLLECTIONS } from "../utils/dbConstants.js";
import { SUCCESS, INTERNAL_ERROR } from "../utils/responseCodeConstants.js";

export async function getQuizLeaderboard(req, res, next) {
  
  const { quizGameID, jwt } = req.body;

  try {
    let db = await req.app.locals.mongodb;
    const leaderboard = await db
      .collection(COLLECTIONS.QUIZ_SESSIONS)
      .aggregate([
        {
          $match: {
            quiz_game_id: new ObjectId(quizGameID),
            is_completed: true,
          },
        },
        {
          $project: {
            _id: 0,
            username: 1,
            score: 1,
          },
        },
        {
          $sort: {
            score: -1,
          },
        },
      ])
      .toArray();

    res.status(SUCCESS).json({ leaderboard: leaderboard, error: "" });
  } catch (e) {
    console.error("Error fetching quiz leaderboard:", e);
    res.status(INTERNAL_ERROR).json({ error: "Failed to fetch leaderboard" });
    return;
  }
}
