import jwtutils from "../jwt-utils.js";

import { ObjectId } from "mongodb";

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
            access_code: parseInt(accessCode), // an object array: [{question: "", options: [], correctAnswer: ""}, {question: "", options: [], correctAnswer: ""}, ...]
        });
        if (!quizGame) {
            res.status(404).json({ error: "Quiz not found or not in progress" });
            return;
        }
        else {
            // Insert guest into the game
            let displayName = username.trim(); // Validate JWT wether its a user or guest
               // Guest user ID, validate JWT wether its a user or guest

            const result = await req.app.locals.mongodb
                .collection("QuizzSessions")
                .insertOne({
                    quiz_game_id: quizGame._id,
                    user_id: userID, // Guest user ID
                    username: displayName, 
                    joined_at: new Date(),
                    finished_at: null // This will be set when the user ends the quiz
                });
            
            const quiz = await req.app.locals.mongodb
                .collection("Quizzes")
                .findOne({
                    _id: quizGame.quiz_id
                });

            const questions = JSON.stringify(quiz.questions);
            const questionsArray = JSON.parse(questions);
            res.status(200).json({ questions: questionsArray, quizSessionID: result.insertedId, error: "" }); //jwt: jwtutils.refreshJWT(payload) });
        }
    } catch (error) {
        console.error("Error joining quiz:", error);
        res.status(500).json({ error: "Failed to join quiz" });
        return;
    }
}