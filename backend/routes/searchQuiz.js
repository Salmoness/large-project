/* This is the /api/quiz/search endpoint.
 *
 * Its purpose is to return an array of quizzes.
 *
 * JWT authorization is required for this endpoint.
 */

import { verifyAndRefreshJWT } from "../utils/jwtService.js";
import { UNAUTHORIZED, SUCCESS } from "../utils/responseCodeConstants.js";

export async function searchQuiz(req, res, next) {
  // Expects a search term and JWT in the request body
  const { search, jwt } = req.body;

  const [jwtPayload, jwtRefreshStr, jwtVerified] = verifyAndRefreshJWT(jwt);
  if (!jwtVerified)
    return res.status(UNAUTHORIZED).json({ error: "JWT invalid or expired" });

  var _search = search.trim();

  if (_search === "") {
    //return all quizzes if search is empty
    const results = await req.app.locals.mongodb
      .collection("Quizzes")
      .find({})
      .toArray();
    res
      .status(SUCCESS)
      .json({ quizzes: results, error: "", jwt: jwtRefreshStr });
    return;
  } else {
    //search for quizzes that match the search term
    const results = await req.app.locals.mongodb
      .collection("Quizzes")
      .find({
        title: { $regex: _search + ".*", $options: "i" },
        //created_by_id: "1" // This is for "viewing own quizzes" feature, can be removed if not needed
      })
      .toArray();
    res
      .status(SUCCESS)
      .json({ quizzes: results, error: "", jwt: jwtRefreshStr });
    return;
  }
}
