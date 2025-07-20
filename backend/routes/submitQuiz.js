// Gets called every time a user submits a quiz.
// It will mark the current session as finished
// It will check if all other sessions are finished
// If all sessions are finished, it will mark the quiz game as finished

import { ObjectId } from "mongodb";
import { verifyAndRefreshJWT } from "../utils/jwtService.js";
import {
  UNAUTHORIZED,
  SUCCESS,
  INTERNAL_ERROR,
} from "../utils/responseCodeConstants.js";

export async function submitQuiz(req, res, next) {
  const { correctCount, jwt } = req.body;

  // quizSessionJWT
  // note: no reason to send the jwtRefreshStr back, the session is over!
  const [jwtPayload, jwtRefreshStr, jwtVerified] = verifyAndRefreshJWT(jwt);
  if (!jwtVerified)
    return res.status(UNAUTHORIZED).json({ error: "JWT invalid or expired" });
  var quizSessionID = jwtPayload.quizSessionId;

  try {
    await req.app.locals.mongodb.collection("QuizzSessions").updateOne(
      { _id: new ObjectId(quizSessionID) },
      {
        $set: {
          finished_at: new Date(),
          correct_count: correctCount,
        },
      }
    );
    const currSession = await req.app.locals.mongodb
      .collection("QuizzSessions")
      .findOne({ _id: new ObjectId(quizSessionID) });

    const sessions = await req.app.locals.mongodb
      .collection("QuizzSessions")
      .find({
        quiz_game_id: new ObjectId(currSession.quiz_game_id),
        finished_at: null,
      })
      .toArray();

    console.log("Sessions found:", sessions.length);
    if (sessions.length === 0) {
      // All sessions are finished, mark the quiz game as finished
      const sessionsFinished = await req.app.locals.mongodb
        .collection("QuizzSessions")
        .find({ quiz_game_id: new ObjectId(currSession.quiz_game_id) })
        .toArray();

      const playerCount = sessionsFinished.length;

      await req.app.locals.mongodb
        .collection("QuizzGames")
        .updateOne(
          { _id: currSession.quiz_game_id },
          { $set: { in_progress: false, players: playerCount } }
        );
    }
  } catch (error) {
    console.error("Error starting quiz:", error);
    res.status(INTERNAL_ERROR).json({ error: "Failed to submit quiz" });
    return;
  }

  res.status(SUCCESS).json({ error: "" });
}
