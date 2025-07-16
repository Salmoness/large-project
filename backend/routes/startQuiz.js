import jwtutils from "../jwt-utils.js";

const { ObjectId } = require("mongodb");

export async function startQuiz(req, res, next) {
    // Expects a search term and JWT in the request body
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
            quiz_id: quizID,
            in_progress: true,
            access_code: code, // an object array: [{question: "", options: [], correctAnswer: ""}, {question: "", options: [], correctAnswer: ""}, ...]
            created_by_id: "1" // USER ID from JWT 
        });
    } catch (error) {
        console.error("Error starting quiz:", error);
        res.status(500).json({ error: "Failed to start quiz" });
        return;
    }
    
    res.status(200).json({ accessCode: code, gameID: result.insertedId, error: "" }); //jwt: jwtutils.refreshJWT(payload) });
}