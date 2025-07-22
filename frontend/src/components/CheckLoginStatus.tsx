
import { getAPIBaseURL } from "./APIBaseURL";
import { retrieveJWTFromLocalStorage } from "../assets/jwt-utils";

export async function checkLoginStatus() : Promise < string | undefined > {
    try {
        // use startQuiz API to host the quiz
        const jwt = retrieveJWTFromLocalStorage();
        const payload = JSON.stringify({ jwt });
        const response = await fetch(getAPIBaseURL() + "users/verify-login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: payload
        })
        const data = await response.json();
        return data.error;
    } catch (error) {
        console.error("Error verifying login:", error);
        alert("Something went wrong while Trying to verify login status.");
    }
};