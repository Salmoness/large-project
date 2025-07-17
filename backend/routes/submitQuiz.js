// Gets called every time a user submits a quiz.
// It will mark the current session as finished
// It will check if all other sessions are finished
// If all sessions are finished, it will mark the quiz game as finished

import jwtutils from "../jwt-utils.js";
import { ObjectId } from "mongodb";

export async function submitQuiz(req, res, next) {
    const { quizSessionID, correctCount, jwt } = req.body;
    
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
        await req.app.locals.mongodb
        .collection("QuizzSessions")
        .updateOne({_id: new ObjectId(quizSessionID)}, 
            {$set: {
                finished_at: new Date(), 
                correct_count: correctCount
                }});

        const currSession = await req.app.locals.mongodb
            .collection("QuizzSessions")
            .findOne({_id: new ObjectId(quizSessionID)});

        const sessions = await req.app.locals.mongodb
            .collection("QuizzSessions")
            .find({quiz_game_id: currSession.quiz_game_id, finished_at: null})

        if (sessions.length === 0) {
        // All sessions are finished, mark the quiz game as finished
        await req.app.locals.mongodb
            .collection("QuizzGames")
            .updateOne({_id: currSession.quiz_game_id}, {$set: {in_progress: false}});
    }
        
    } catch (error) {
        console.error("Error starting quiz:", error);
        res.status(500).json({ error: "Failed to submit quiz" });
        return;
    }    
    res.status(200).json({ error: "" }); //jwt: jwtutils.refreshJWT(payload) });
}