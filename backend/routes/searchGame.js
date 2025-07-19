import jwtutils from "../jwt-utils.js";
import { ObjectId } from "mongodb";

export async function searchGame(req, res, next) {
    // Expects a search term and JWT in the request body
    const { search, userId, jwt } = req.body;

    // implement JWT verification
    // try {
    //     jwtutils.verifyJWT(jwt);
    // } catch (e) {
    //     console.log(e);
    //     res.status(200).json({ results: [], error: "Session invalid", jwt: "" });
    //     return;
    // }
    // const payload = jwtutils.decodeJWT(jwt).payload;
    
    let _search = search.trim();
    let quizIdSet = new Set();
    let quizzes;

    try {    
        const gamesHostedByUser = await req.app.locals.mongodb
                .collection("QuizzGames")
                .find({created_by_id: userId, in_progress: false}) // userId to new ObjectId(userId) when we change logit to use _id and JWT
                .toArray();

        for (let i = 0; i < gamesHostedByUser.length; i++) {
            quizIdSet.add(gamesHostedByUser[i].quiz_id.toString());
        }
        const quizIdArray = Array.from(quizIdSet).map(id => new ObjectId(id));

        if (_search === "") {
            //return all games if search is empty
            quizzes = await req.app.locals.mongodb
                .collection("Quizzes")
                .find({_id: { $in: quizIdArray}}) 
                .toArray();
        }
        else{
            //return all games with a search term
            quizzes = await req.app.locals.mongodb
                .collection("Quizzes")
                .find({ _id: { $in: quizIdArray},
                        title: { $regex: _search + ".*", $options: "i" }}) 
                .toArray();
        }

        let games = []

        for (let i = 0 ; i < gamesHostedByUser.length ; i++)
        {
            let currQuiz = quizzes.find(q => q._id.equals(gamesHostedByUser[i].quiz_id))
            if (!currQuiz) continue;

            games.push({_id: gamesHostedByUser[i]._id, title: currQuiz.title, summary: currQuiz.summary, questions: currQuiz.questions, players: gamesHostedByUser[i].players})
        }
        return res.status(200).json({ games: games, error: "" });
    } catch(error) {
        console.log("Error: " + error);
        return res.status(200).json({ error: error.toString() });
    }
}