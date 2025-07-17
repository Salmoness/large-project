import jwtutils from "../jwt-utils.js";
import { ObjectId } from "mongodb";

export async function startQuiz(req, res, next) {
    
    const { quizID, jwt } = req.body;

    // implement JWT verification
    // try {
    //     jwtutils.verifyJWT(jwt);
    // } catch (e) {
    //     console.log(e);
    //     res.status(200).json({ results: [], error: "Session invalid", jwt: "" });
    //     return;
    // }
    // const payload = jwtutils.decodeJWT(jwt).payload;
    let code = Math.floor(Math.random() * 90000) + 10000;

    try {
        const result = await req.app.locals.mongodb
        .collection("QuizzGames")
        .insertOne({
            quiz_id: new ObjectId(quizID),
            in_progress: true,
            access_code: code, // an object array: [{question: "", options: [], correctAnswer: ""}, {question: "", options: [], correctAnswer: ""}, ...]
            created_by_id: "1" // USER ID from JWT 
        });
        res.status(200).json({ accessCode: code, gameID: result.insertedId, error: "" }); //jwt: jwtutils.refreshJWT(payload) });
    } catch (error) {
        console.error("Error starting quiz:", error);
        res.status(500).json({ error: "Failed to start quiz" });
        return;
    }
}