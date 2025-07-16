import jwtutils from "../jwt-utils.js";

const { ObjectId } = require("mongodb");

export async function guestJoinQuiz(req, res, next) {
    // Expects a search term and JWT in the request body
    const { username, accessCode, jwt } = req.body;

    // implement JWT verification
    // try {
    //     jwtutils.verifyJWT(jwt);
    // } catch (e) {
    //     console.log(e);
    //     res.status(200).json({ results: [], error: "Session invalid", jwt: "" });
    //     return;
    // }
    // const payload = jwtutils.decodeJWT(jwt).payload;
    
    try {
        const quizGame = await req.app.locals.mongodb
        .collection("QuizzGames")
        .findOne({
            in_progress: true,
            access_code: accessCode, // an object array: [{question: "", options: [], correctAnswer: ""}, {question: "", options: [], correctAnswer: ""}, ...]
        });
        if (!quizGame) {
            res.status(404).json({ error: "Quiz not found or not in progress" });
            return;
        }
        else {
            // Insert guest into the game
            let displayName = username.trim(); // Validate JWT wether its a user or guest
            let userid = "0"; // Guest user ID, validate JWT wether its a user or guest

            const result = await req.app.locals.mongodb
                .collection("QuizzSessions")
                .insertOne({
                    quiz_game_id: quizGame._id,
                    username: displayName, 
                    joined_at: new Date(),
                });
            
        }
    } catch {
        console.error("Error joining quiz:", error);
        res.status(500).json({ error: "Failed to join quiz" });
        return;
    }
    
    
    res.status(200).json({ accessCode: code, gameID: quizGame.insertedId, error: "" }); //jwt: jwtutils.refreshJWT(payload) });
}