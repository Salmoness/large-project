import { useState } from "react";
import { getAPIBaseURL } from "../components/APIBaseURL.tsx";
import ProjectHeader from "../components/ProjectHeader.tsx";
import type { Question } from "../types";
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
    const [quiz, setQuiz] = useState<Question[]>([]); // Assuming quiz is a string for simplicity
    const [message, setMessage] = useState("");
    
    async function handleGenerateQuiz(): Promise<void>{
        // contacts the prompt API to generate a quiz based on the topic and displays the content
        setMessage("ChatGPT doing its magic pls wait...");

        try {
              const response = await fetch(getAPIBaseURL() + "users/prompt", {
                method: "POST",
                body: JSON.stringify({ topic: topic }),
                headers: { "Content-Type": "application/json" },
              });
              const res = await response.json();
              if (res.error) {
                setQuiz(res.error);
                setMessage("");
              } 
              else {
                let parsedQuiz = createQuestionArray(res.questions); 
                setQuiz(parsedQuiz); 
                setMessage("");
              }
        } catch (error: any) {
            setMessage("Service unavailable. Try again later!");
        }
    }

    function createQuestionArray(quiz: string): Question[] {
        const questions: Question[] = [];
        try{
            let quizList = JSON.parse(quiz);
            for (let i = 0; i < quizList.length; i++) {
                let question: Question = {
                    question: quizList[i].question,
                    options: quizList[i].options,
                    correctAnswer: quizList[i].correctAnswer,
                };
                questions.push(question);
            } 
        } catch (error) {
            console.error("Error parsing quiz string:", error);
        }
        return questions;
    }   

    return (
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", maxWidth: 600, mx: "auto", mt: 4, mb: 4 }}>   
                <ProjectHeader></ProjectHeader>
                <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
                    Playground for AI Prompt Generation
                </Typography>
                <Typography variant="body1" gutterBottom>
                    This page is designed to test the AI prompt generation functionality.
                </Typography>

                { quiz.length > 0 && (
                    <Box sx={{ mt: 2, mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2, width: "100%" }}>
                        <Typography variant="h6" gutterBottom>Generated Quiz:</Typography>
                        { quiz.map((item, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                            <Typography variant="subtitle1">{`Q${index + 1}: ${item.question}`}</Typography>
                            <ul style={{ paddingLeft: "1.5em", marginTop: 0 }}>
                            { item.options.map((opt, idx) => (
                                <li key={idx}>
                                <Typography variant="body2">{opt}</Typography>
                                </li> ))}
                            </ul>
                            <Typography variant="caption" color="text.secondary">
                            Correct Answer: {item.correctAnswer}
                            </Typography>
                        </Box> ))}
                    </Box>
                )}

                { message && (
                    <Box sx={{ mt: 2, mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2, width: "100%" }}>
                        <Typography variant="h6">Message:</Typography>
                        <Typography variant="body1">{message}</Typography>
                    </Box>
                )}

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