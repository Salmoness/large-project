/* This is the /api/quiz/leaderboard endpoint.
 *
 * Its purpose is to provide an array of usernames, sorted in order of
 * number of correct answers, with tie breaking being determined by
 * the amount of time it took for them to finish the quiz.
 *
 * JWT authorization is NOT needed for this endpoint.
 */

import { ObjectId } from "mongodb";
import { SUCCESS, INTERNAL_ERROR } from "../utils/responseCodeConstants.js";

export async function getQuizLeaderboard(req, res, next) {
  const { quizGameID, jwt } = req.body;

  let leaderboard = [];

  try {
    const sessions = await req.app.locals.mongodb
      .collection("QuizzSessions")
      .find({ quiz_game_id: new ObjectId(quizGameID) })
      .toArray();

    console.log("Sessions found:", sessions.length);

    for (let i = 0; i < sessions.length; i++) {
      leaderboard.push({
        username: sessions[i].username,
        correctCount: sessions[i].correct_count,
        finishedAt: sessions[i].finished_at.toString(), // may be buggy?
      });
    }

    leaderboard.sort((a, b) => {
      if (b.correctCount !== a.correctCount) {
        return b.correctCount - a.correctCount;
      } else {
        return new Date(a.finishedAt) - new Date(b.finishedAt); // tiebreaker: earlier finishedAt first
      }
    });

    res.status(SUCCESS).json({ leaderboard: leaderboard, error: "" });
  } catch (e) {
    console.error("Error fetching quiz leaderboard:", e);
    res.status(INTERNAL_ERROR).json({ error: "Failed to fetch leaderboard" });
    return;
  }
}
