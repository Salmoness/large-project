
import { getAPIBaseURL } from "./APIBaseURL";
import { retrieveJWTFromLocalStorage } from "../assets/jwt-utils";

export async function hostQuiz(quizID: any) : Promise<void> {
    try {
        // use startQuiz API to host the quiz
        const jwt = retrieveJWTFromLocalStorage();
        const payload = JSON.stringify({ quizID: quizID, jwt: jwt });
        const response = await fetch(getAPIBaseURL() + "quiz/start", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: payload
        })
        const data = await response.json();

        if (data.error) {
            console.error("Error starting quiz:", data.error);
            return;
        }
        console.log("Quiz started successfully:", data);
        // Navigate to the host page with quizID
        return data.accessCode; 
    } catch (error) {
        console.error("Error hosting quiz:", error);
        alert("Something went wrong while Trying to host the quiz.");
    }
};