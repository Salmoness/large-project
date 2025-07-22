import { useState, useEffect } from "react";
import type { Question } from "../types";
import QuizCard from "../components/QuizCard";
import ResultScreen from "../components/ResultsScreen";
import CenteredContainer from "../components/CenteredContainer";
import { getAPIBaseURL } from "../components/APIBaseURL";
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
import { retrieveJWTFromLocalStorage } from "../assets/jwt-utils";
import { useNavigate } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const initialTime = 20;

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
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!data.error) {
        setLoggedIn(true);
        setName(data.username);
      } else {
        setLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleStart() {
    if (name.trim() && gameCode.trim()) {
      setLoading(true);
      const jwt = retrieveJWTFromLocalStorage();
      const payload = JSON.stringify({
        username: name.trim(),
        accessCode: gameCode.trim(),
        jwt,
      });

      try {
        const response = await fetch(getAPIBaseURL() + "quiz/join", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
        });

        const data = await response.json();
        setQuizSessionJWT(data.jwt);

        if (data.error) {
          alert(data.error);
          setLoading(false);
          return;
        }

        if (!Array.isArray(data.questions)) {
          alert("Invalid question data from server.");
          setLoading(false);
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
        alert("Failed to start the quiz.");
      } finally {
        setLoading(false);
      }
    }
  }

  async function handleSubmit() {
    try {
      const response = await fetch(getAPIBaseURL() + "quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizSessionID: sessionID,
          score: score,
          jwt: quizSessionJWT,
        }),
      });

      const data = await response.json();
      if (data.error) console.error("Error submitting results:", data.error);
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
        <Box sx={{ maxWidth: 450, mx: "auto", mt: 8, p: 4, borderRadius: 3, boxShadow: 3, backgroundColor: "#fff", textAlign: "center" }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Join Quiz
          </Typography>
          <Stack spacing={3} sx={{ mt: 3 }}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loggedIn}
            />
            <TextField
              label="Game Code"
              variant="outlined"
              fullWidth
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value.toUpperCase())}
              inputProps={{ maxLength: 6, style: { textTransform: "uppercase" } }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleStart}
              disabled={!name.trim() || !gameCode.trim() || loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Start Quiz"}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => (!loggedIn ? navigate("/") : navigate("/host_dashboard"))}
              fullWidth
            >
              Home
            </Button>
          </Stack>
        </Box>
      )}

      {step === "quiz" && (
        <>
          <Box sx={{ width: "100%", maxWidth: 600, mb: 3, mx: "auto", display: "flex", alignItems: "center", gap: 1 }}>
            <AccessTimeIcon sx={{ color: timeLeft < 5 ? "#d32f2f" : "#1976d2", fontSize: 30 }} />
            <LinearProgress
              variant="determinate"
              value={timePercentage}
              sx={{
                flexGrow: 1,
                height: 12,
                borderRadius: 6,
                boxShadow: "0 2px 6px rgba(25, 118, 210, 0.3)",
                [`& .MuiLinearProgress-bar`]: {
                  backgroundColor: timeLeft < 5 ? "#d32f2f" : "#1976d2",
                  transition: "background-color 0.3s ease",
                },
              }}
            />
          </Box>

          <Stack direction="row" justifyContent="space-between" alignItems="center" maxWidth={600} mx="auto" mb={3} px={1}>
            <AnimatePresence>
              <motion.div
                key={score}
                initial={{ scale: 1 }}
                animate={scoreFlash ? { scale: 1.3 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="body1" fontWeight={700} color="#1976d2">
                  Score: {score}
                </Typography>
              </motion.div>
            </AnimatePresence>
          </Stack>

          <Box sx={{ maxWidth: 600, mx: "auto", mb: 4, borderRadius: 3, boxShadow: 1, backgroundColor: "#ffffff", p: 3 }}>
            {questions.length > 0 && (
              <QuizCard
                question={questions[current].question}
                options={questions[current].options}
                onAnswer={handleAnswer}
              />
            )}
          </Box>

          <Typography variant="body2" textAlign="center" color="text.secondary" mb={4}>
            Question {current + 1} of {questions.length}
          </Typography>
        </>
      )}

      {step === "result" && (
        <Box sx={{ maxWidth: 500, mx: "auto", mt: 10, p: 4, borderRadius: 3, boxShadow: 3, backgroundColor: "#fff", textAlign: "center" }}>
          <ResultScreen
            score={score}
            total={questions.length * 1000}
            correctCount={correctCount}
            totalQuestions={questions.length}
            onRestart={handleRestart}
          />
        </Box>
      )}
    </CenteredContainer>
  );
}
