import { useState, useEffect } from "react";
import type { Question } from "../types";
import QuizCard from "../components/QuizCard";
import StartScreen from "../components/StartScreen";
import ResultScreen from "../components/ResultsScreen";
import CenteredContainer from "../components/CenteredContainer";

const questions: Question[] = [
  {
    question: "What is the capital of Japan?",
    options: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
    correct: "Tokyo",
  },
  {
    question: "2 + 2 = ?",
    options: ["3", "4", "5", "6"],
    correct: "4",
  },
];

export default function PlayPage() {
  const [step, setStep] = useState<"start" | "quiz" | "result">("start");
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [name, setName] = useState("");

  // Timer logic
  useEffect(() => {
    console.log(name);
    if (step !== "quiz") return;

    setTimeLeft(10); // Reset timer on new question

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleAnswer("timeout"); // Handle timeout as no or wrong answer
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step, current]);

  const handleStart = (userName: string) => {
    setName(userName);
    setStep("quiz");
    setScore(0);
    setCurrent(0);
  };

  const handleAnswer = (answer: string) => {
    // Ignore 'timeout' answer as incorrect (or handle differently if you want)
    if (answer !== "timeout" && answer === questions[current].correct) {
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
  };

  return (
    <CenteredContainer>
      {step === "start" && <StartScreen onStart={handleStart} />}
      {step === "quiz" && (
        <>
          <div
            style={{
              width: "100%",
              maxWidth: 600,
              marginBottom: 8,
              textAlign: "right",
              color: "gray",
            }}
          >
            Time left: {timeLeft}s
          </div>
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
