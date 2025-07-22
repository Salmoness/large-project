/* This is the /api/quiz/search endpoint.
 *
 * Its purpose is to return an array of quizzes.
 *
 * JWT authorization is required for this endpoint.
 */

import { verifyAndRefreshJWT } from "../utils/jwtService.js";
import { UNAUTHORIZED, SUCCESS } from "../utils/responseCodeConstants.js";

export async function searchQuiz(req, res, next) {
  // Expects a search term, own boolean, and JWT in the request body
  // if own==true, searches within own quizzes. 
  const { search, own, jwt } = req.body;

  const [jwtPayload, jwtRefreshStr, jwtVerified] = verifyAndRefreshJWT(jwt);
  if (!jwtVerified)
    return res.status(UNAUTHORIZED).json({ error: "JWT invalid or expired" });

  var userId = jwtPayload.userId;
  var _search = search.trim();

  // if search term exists, query all matching titles. If not, titleQuery is empty. 
  const titleQuery = _search === "" ? {} : { title: { $regex: _search + ".*", $options: "i" } };

  // construct final query depending on "own" and "titleQuery"
  const query = own ? { ...titleQuery, created_by_id: userId } : titleQuery

  const results = await req.app.locals.mongodb
    .collection("Quizzes")
    .find(query)
    .sort({ created_at: -1 })
    .toArray();
  res
    .status(SUCCESS)
    .json({ quizzes: results, error: "", jwt: jwtRefreshStr });
  return;
}
