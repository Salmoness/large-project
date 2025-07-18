import { useState, useEffect } from "react";
import type { Question } from "../types";
import QuizCard from "../components/QuizCard";
import ResultScreen from "../components/ResultsScreen";
import CenteredContainer from "../components/CenteredContainer";
import { getAPIBaseURL } from "../components/APIBaseURL.tsx";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
} from "@mui/material";

//TODO: change to API fetch call
let questions: Question[] = [
  {
    question: "What is the capital of Japan?",
    options: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
    correctAnswer: "Tokyo",
  },
  {
    question: "2 + 2 = ?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Mark Twain", "Jane Austen", "Charles Dickens"],
    correctAnswer: "William Shakespeare",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["O2", "H2O", "CO2", "NaCl"],
    correctAnswer: "H2O",
  },
];

export default function PlayPage() {
  const [step, setStep] = useState<"start" | "quiz" | "result">("start");
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [name, setName] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [sessionID, setSessionID] = useState("");

  // Timer logic
  useEffect(() => {
    if (step !== "quiz") return;

    setTimeLeft(20); // Reset timer on new question

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleAnswer("timeout");
          return 20;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step, current]);

  async function handleStart() {
    console.log("Starting quiz with name:", name, "and game code:", gameCode);
    
    if (name.trim() && gameCode.trim()) {
      const username = name.trim();
      const accessCode = gameCode.trim();
      const payload = JSON.stringify({username, accessCode})
      try {
        const response = await fetch(getAPIBaseURL() + "quiz/join", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: payload,
        });
        const data = await response.json();
        if (data.error) {
          alert(data.error);
          console.error("Error joining quiz:", data.error);
          return;
        }
      questions = data.questions; 
      setSessionID(data.quizSessionID); 
      setStep("quiz");
      setScore(0);
      setCurrent(0);

    } catch (error) {
      console.error("Error starting quiz:", error);
      alert("Failed to start the quiz. Please check your inputs.");
    }
  }
}

  async function handleSubmit() {
    try {
      const response = await fetch(getAPIBaseURL() + "quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizSessionID: sessionID, 
          correctCount: score,
        }),
      });

      const data = await response.json();
      if (data.error) {
        console.error("Error submitting results:", data.error);
      } else {
        console.log("Results submitted successfully:", data);
      }
    } catch (error) {
      console.error("Error submitting results:", error);
    }
  }

  const handleAnswer = (answer: string) => {
    if (answer !== "timeout" && answer === questions[current].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      handleSubmit();
      setStep("result");
    }
  };

  const handleRestart = () => {
    setStep("start");
    setScore(0);
    setCurrent(0);
    setName("");
    setGameCode("");
  };

  return (
    <CenteredContainer>
      {step === "start" && (
        <Box sx={{ maxWidth: 400, mx: "auto", textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Player Name and Game Access Code
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
            <TextField
              label="Game Code"
              variant="outlined"
              fullWidth
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value.toUpperCase())}
              inputProps={{ maxLength: 6, style: { textTransform: "uppercase" } }}
              placeholder="e.g. 12345"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleStart}
              disabled={!name.trim() || !gameCode.trim()}
              sx={{ py: 1.5 }}
              fullWidth
            >
              Start Quiz
            </Button>
          </Stack>
        </Box>
      )}

      {step === "quiz" && (
        <>
          <Box
            sx={{
              width: "100%",
              maxWidth: 600,
              mb: 1,
              textAlign: "right",
              color: "gray",
            }}
          >
            Time left: {timeLeft}s
          </Box>
          <QuizCard
            question={questions[current].question}
            options={questions[current].options}
            onAnswer={handleAnswer}
          />
        </>
      )}

      {step === "result" && (
        
        <ResultScreen
          score={score}
          total={questions.length}
          onRestart={handleRestart}
        />
      )}
    </CenteredContainer>
  );
}
