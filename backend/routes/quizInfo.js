/* This is the /api/quiz/info endpoint.
 *
 * Its purpose is to provide the description of a quiz given its id. A quiz
 * description consists of a title, summary, and topic.
 *
 * No JWT is needed for this endpoint.
 */

import { ObjectId } from "mongodb";
import { COLLECTIONS } from "../utils/dbConstants.js";
import {
  BAD_REQUEST,
  INTERNAL_ERROR,
  SUCCESS,
} from "../utils/responseCodeConstants.js";

export async function quizInfo(req, res, next) {
  const { quizID } = req.body;

  if (!quizID) {
    return res.status(BAD_REQUEST).json({ error: "Missing required field" });
  }

  try {
    const db = req.app.locals.mongodb;
    const result = await db.collection(COLLECTIONS.QUIZZES).findOne(
      { _id: new ObjectId(quizID) },
      {
        // omit _id and questions from the result json
        projection: {
          summary: 1,
          topic: 1,
          title: 1,
          _id: 0,
        },
      }
    );

    if (!result) {
      res.status(BAD_REQUEST).json({ error: "No quiz with that ID was found" });
    }

    res.status(SUCCESS).json({
      error: "",
      topic: result["topic"],
      title: result["title"],
      summary: result["summary"],
    });
  } catch (err) {
    console.log("Internal error for /api/quiz/info: " + err);
    res.status(INTERNAL_ERROR).json({ error: "Internal error" });
    return;
  }
}
