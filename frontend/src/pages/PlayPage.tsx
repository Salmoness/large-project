import { useState, useEffect } from "react";
import type { Question } from "../types";
import QuizCard from "../components/QuizCard";
import ResultScreen from "../components/ResultsScreen";
import CenteredContainer from "../components/CenteredContainer";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
} from "@mui/material";

const questions: Question[] = [
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

  // Timer logic
  useEffect(() => {
    if (step !== "quiz") return;

    setTimeLeft(10); // Reset timer on new question

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleAnswer("timeout");
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step, current]);

  const handleStart = () => {
    if (name.trim() && gameCode.trim()) {
      setStep("quiz");
      setScore(0);
      setCurrent(0);
    }
  };

  const handleAnswer = (answer: string) => {
    if (answer !== "timeout" && answer === questions[current].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
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
              placeholder="e.g. ABC123"
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
