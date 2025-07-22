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
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { retrieveJWTFromLocalStorage } from "../assets/jwt-utils.ts";
import { useNavigate } from "react-router-dom";

const initialTime = 20; // seconds

export default function PlayPage() {
  const [step, setStep] = useState<"start" | "quiz" | "result">("start");
  const [score, setScore] = useState(0);
  const [scoreFlash, setScoreFlash] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [name, setName] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [sessionID, setSessionID] = useState("");
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [quizSessionJWT, setQuizSessionJWT] = useState("");

  const timePercentage = (timeLeft / initialTime) * 100;
  const navigate = useNavigate();

  useEffect(() => {

    checkLoginStatus();

    if (step !== "quiz") return;

    setTimeLeft(initialTime);
    setQuestionStartTime(Date.now());

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleAnswer("timeout");
          return initialTime;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step, current]);

    async function checkLoginStatus() {
      try {
        const payload = JSON.stringify({ jwt: retrieveJWTFromLocalStorage() });
        const response = await fetch(getAPIBaseURL() + "users/verify-login", {
          method: "POST",
          body: payload,
          headers: {"Content-Type": "application/json"}
        })
        console.log("status: " + response.status);
        const data = await response.json();
        if (!data.error) {
          setLoggedIn(true);
          setName(data.username);
        }
        else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.log( error)
      }
      
    }

  async function handleStart() {
    if (name.trim() && gameCode.trim()) {
      setLoading(true);
      const username = name.trim();
      const accessCode = gameCode.trim();
      const jwt = retrieveJWTFromLocalStorage();
      const payload = JSON.stringify({ username, accessCode, jwt });

      try {
        const response = await fetch(getAPIBaseURL() + "quiz/join", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: payload,
        });

        const data = await response.json();
        setQuizSessionJWT(data.jwt);

        if (data.error) {
          alert(data.error);
          return;
        }

        if (!data.questions || !Array.isArray(data.questions)) {
          alert("Invalid question data from server.");
          return;
        }

        setQuestions(data.questions);
        setSessionID(data.quizSessionID);
        setStep("quiz");
        setScore(0);
        setCorrectCount(0);
        setCurrent(0);
      } catch (error) {
        console.error("Error starting quiz:", error);
        alert("Failed to start the quiz. Please check your inputs.");
      } finally {
        setLoading(false);
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
          jwt: quizSessionJWT
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
    let earnedPoints = 0;
    const correctAnswer = questions[current]?.correctAnswer;

    if (answer !== "timeout" && answer === correctAnswer) {
      const timeTakenMs = Date.now() - questionStartTime;
      const deduction = (timeTakenMs / 1000) * 50;
      earnedPoints = Math.max(0, Math.floor(1000 - deduction));

      setScore((prev) => prev + earnedPoints);
      setCorrectCount((prev) => prev + 1);
      setScoreFlash(true);
    }

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      handleSubmit();
      setStep("result");
    }

    setTimeout(() => setScoreFlash(false), 400);
  };

  const handleRestart = () => {
    setStep("start");
    setScore(0);
    setCorrectCount(0);
    setCurrent(0);
    setName("");
    setGameCode("");
    setQuestions([]);
  };

  return (
    <CenteredContainer>
      {step === "start" && (
        <Box sx={{ maxWidth: 400, mx: "auto", textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Join Quiz
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              disabled={loggedIn}
            />
            <TextField
              label="Game Code"
              variant="outlined"
              fullWidth
              value={gameCode}
              onChange={(e) =>
                setGameCode(e.target.value.toUpperCase())
              }
              inputProps={{
                maxLength: 6,
                style: { textTransform: "uppercase" },
              }}
              placeholder="e.g. 12345"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleStart}
              disabled={!name.trim() || !gameCode.trim() || loading}
              sx={{ py: 1.5, height: 48 }}
              fullWidth
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Start Quiz"
              )}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {!loggedIn ? navigate("/") : navigate('/host_dashboard')}}
              sx={{ py: 1.5, height: 48 }}
              fullWidth
            >
                Home
            </Button>
          </Stack>
        </Box>
      )}

      {step === "quiz" && (
        <>
          <Box sx={{ width: "100%", maxWidth: 600, mb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={timePercentage}
              sx={{
                height: 10,
                borderRadius: 5,
                [`& .MuiLinearProgress-bar`]: {
                  backgroundColor:
                    timeLeft < 5 ? "error.main" : "primary.main",
                },
              }}
            />
          </Box>

          <Box sx={{ width: "100%", maxWidth: 600, mb: 1, textAlign: "right", color: "gray" }}>
            Time left: {timeLeft}s
          </Box>

          <Box sx={{ width: "100%", maxWidth: 600, mb: 1, textAlign: "left", color: "gray" }}>
            <AnimatePresence>
              <motion.div
                key={score}
                initial={{ scale: 1 }}
                animate={scoreFlash ? { scale: 1.25 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="body2">Score: {score}</Typography>
              </motion.div>
            </AnimatePresence>
          </Box>

          {questions.length > 0 && (
            <QuizCard
              question={questions[current].question}
              options={questions[current].options}
              onAnswer={handleAnswer}
            />
          )}

          <Typography variant="body2">
            Question {current + 1} of {questions.length}
          </Typography>
        </>
      )}

      {step === "result" && (
        <ResultScreen
          score={score}
          total={questions.length * 1000}
          correctCount={correctCount}
          totalQuestions={questions.length}
          onRestart={handleRestart}
        />
      )}
    </CenteredContainer>
  );
}
