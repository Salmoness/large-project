import jwtutils from "../jwt-utils.js";
import { ObjectId } from "mongodb";

export async function getQuizLeaderboard(req, res, next) {
    // Expects a search term and JWT in the request body
    const { quizGameID, jwt } = req.body;

    // implement JWT verification
    // try {
    //     jwtutils.verifyJWT(jwt);
    // } catch (e) {
    //     console.log(e);
    //     res.status(200).json({ results: [], error: "Session invalid", jwt: "" });
    //     return;
    // }
    // const payload = jwtutils.decodeJWT(jwt).payload;
    let leaderboard = [];

    try {
        const sessions = await req.app.locals.mongodb
            .collection("QuizzSessions")
            .find({quiz_game_id: new ObjectId(quizGameID)})
            .toArray();

        console.log("Sessions found:", sessions.length);

        for (let i = 0; i < sessions.length; i++) {
            leaderboard.push({
                username: sessions[i].username,
                correctCount: sessions[i].correct_count,
                finishedAt: sessions[i].finished_at.toString(), // may be buggy?
            });
        } 

        leaderboard.sort((a, b) => {
        if (b.correctCount !== a.correctCount) {
            return b.correctCount - a.correctCount; 
        } else {
            return new Date(a.finishedAt) - new Date(b.finishedAt); // tiebreaker: earlier finishedAt first
        }
        });

        res.status(200).json({ leaderboard: leaderboard, error: "" }); //jwt:
    } catch (e) {
        console.error("Error fetching quiz leaderboard:", e);
        res.status(500).json({ error: "Failed to fetch leaderboard" });
        return;
    }
}