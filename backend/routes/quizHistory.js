/* This is the /api/quiz/history endpoint.
 *
 * Its purpose is to provide an array of quizGameIds, titles, summaries, and topics
 * of the quizzes in which the user (their id provided by the JWT) requests
 * and has completed.
 *
 * JWT authorization is required for this endpoint.
 */

import { ObjectId } from "mongodb";
import { COLLECTIONS } from "../dbConstants.js";

export async function quizHistory(req, res, next) {
  const { jwt } = req.body;

  // todo: get userId from JWT

  try {
    const db = req.app.locals.mongodb;
    const sessions = await db
      .collection(COLLECTIONS.QUIZ_SESSIONS)
      .find({ userId })
      .toArray();
    const quizIds = [
      ...new Set(sessions.map((s) => s.quiz_id).filter(Boolean)),
    ];

    if (quizIds.length === 0) {
      return res.status(200).json({ error: "", history: [] });
    }

    const quizzes = await db
      .collection(COLLECTIONS.QUIZZES)
      .find(
        { _id: { $in: quizIds.map((id) => new ObjectId(id)) } },
        {
          // _id is kept automatically and does not need to be specified
          projection: {
            title: 1,
            summary: 1,
            topic: 1,
          },
        }
      )
      .toArray();

    // result should be of the form [{},{},...] where each {} has a quizId, title,
    // summary, and topic field.
    const response = quizzes.map((q) => ({
      quizGameId: q._id.toString(),
      title: q.title,
      summary: q.summary,
      topic: q.topic,
    }));

    res.status(200).json({ error: "", hisory: response });
  } catch (err) {
    console.log("Internal error for /api/quiz/history: " + err);
    res.status(200).json({ error: "Internal error" });
  }
}
