import { useState } from "react";
import { getAPIBaseURL } from "../components/APIBaseURL.tsx";
import ProjectHeader from "../components/ProjectHeader.tsx";
// import type { Question } from "../types";
// import QuizCard from "../components/QuizCard";
// import ResultScreen from "../components/ResultsScreen";
// import CenteredContainer from "../components/CenteredContainer";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
} from "@mui/material";

export default function PlaygroundPage(){
    const [topic, setTopic] = useState("");
    const [quiz, setQuiz] = useState(""); // Assuming quiz is a string for simplicity
    
    async function handleGenerateQuiz(): Promise<void>{
        // contacts the prompt API to generate a quiz based on the topic and displays the content
        setQuiz("ChatGPT doing its magic pls wait...");

        try {
              const response = await fetch(getAPIBaseURL() + "users/prompt", {
                method: "POST",
                body: JSON.stringify({ topic: topic }),
                headers: { "Content-Type": "application/json" },
              });
              const res = await response.json();
              if (res.error) {
                setQuiz(res.error);
              } 
              else {
                // let cleanedQuiz = cleanQuizString(res.questions); doesnt work yet
                setQuiz(JSON.stringify(res.questions, null, 2)); 
              }
            } catch (error: any) {
                setQuiz("Service unavailable. Try again later!");
              return;
            }
        fetch(getAPIBaseURL() + "prompt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic: topic }),
        })
    }

    
    // function cleanQuizString(quiz: object): string {
    //     let cleanedQuiz = "";
        
    //     for (const { question, options, correctAnswer } of quiz) {
    //         console.log(question);
    //         console.log(options);
    //         console.log("Correct:", correctAnswer);
    //     }

    //     return cleanedQuiz;
    // }

    return (
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%", maxWidth: 600, mx: "auto", mt: 4 }}>   
                <ProjectHeader></ProjectHeader>
                <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
                    Playground for AI Prompt Generation
                </Typography>
                <Typography variant="body1" gutterBottom>
                    This page is designed to test the AI prompt generation functionality.
                </Typography>
                {
                    quiz && (
                        <Box sx={{ mt: 2, mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2, width: "100%" }}>
                            <Typography variant="h6">Output:</Typography>
                            <Typography variant="body1">{quiz}</Typography>
                        </Box>
                    )
                }
                <Stack spacing={2} mt={2} sx={{ width: "100%" }}>
                    <TextField
                        label="Enter a topic"
                        variant="outlined"
                        fullWidth
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder=" e.g. Science, History, etc."
                    />
                    <Button variant="contained" color="primary" onClick={()=>handleGenerateQuiz()}>
                        Generate Quiz
                    </Button>
                </Stack>
            </Box>
    );
}