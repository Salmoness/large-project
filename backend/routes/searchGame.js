import { ObjectId } from "mongodb";
import { verifyAndRefreshJWT } from "../utils/jwtService.js";
import {
  UNAUTHORIZED,
  SUCCESS,
  INTERNAL_ERROR,
} from "../utils/responseCodeConstants.js";

export async function searchGame(req, res, next) {
  console.log("reaches")
  // Expects a search term and JWT in the request body
  const { search, jwt } = req.body;

  const [jwtPayload, jwtRefreshStr, jwtVerified] = verifyAndRefreshJWT(jwt);
  if (!jwtVerified)
    return res.status(UNAUTHORIZED).json({ error: "JWT invalid or expired" });

  let _search = search.trim();
  let quizIdSet = new Set();
  let quizzes;

  try {
    const gamesHostedByUser = await req.app.locals.mongodb
      .collection("QuizzGames")
      .find({ created_by_id: jwtPayload.userId, in_progress: false })
      .sort({ created_at: -1 })
      .toArray();

    for (let i = 0; i < gamesHostedByUser.length; i++) {
      quizIdSet.add(gamesHostedByUser[i].quiz_id.toString());
    }
    const quizIdArray = Array.from(quizIdSet).map((id) => new ObjectId(id));

    if (_search === "") {
      //return all games if search is empty
      quizzes = await req.app.locals.mongodb
        .collection("Quizzes")
        .find({ _id: { $in: quizIdArray } })
        .toArray();
    } else {
      //return all games with a search term
      quizzes = await req.app.locals.mongodb
        .collection("Quizzes")
        .find({
          _id: { $in: quizIdArray },
          title: { $regex: _search + ".*", $options: "i" },
        })
        .toArray();
    }

    let games = [];

    for (let i = 0; i < gamesHostedByUser.length; i++) {
      let currQuiz = quizzes.find((q) =>
        q._id.equals(gamesHostedByUser[i].quiz_id)
      );
      if (!currQuiz) continue;

      games.push({
        _id: gamesHostedByUser[i]._id,
        title: currQuiz.title,
        summary: currQuiz.summary,
        questions: currQuiz.questions,
        players: gamesHostedByUser[i].players,
        created_at: new Date(gamesHostedByUser[i].created_at)
      });
    }

    return res
      .status(SUCCESS)
      .json({ games: games, error: "", jwt: jwtRefreshStr });
  } catch (error) {
    console.log("Error: " + error);
    return res
      .status(INTERNAL_ERROR)
      .json({ error: error.toString(), jwt: jwtRefreshStr });
  }
}
