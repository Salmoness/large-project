import { Box, Button, Typography, Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { getAPIBaseURL } from "../components/APIBaseURL.tsx";

export default function GenerationSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { summary, questions, quizID } = location.state || {};

  async function handleHostQuiz() : Promise<void> {
    try {
        // use startQuiz API to host the quiz
        const payload = JSON.stringify({ quizID: quizID });
        const response = await fetch(getAPIBaseURL() + "/quiz/start", {
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
        navigate("/host", { state: { accessCode: data.accessCode, summary: summary, quizID: quizID } });

    } catch (error) {
        console.error("Error hosting quiz:", error);
        alert("Something went wrong while Trying to host the quiz.");
    }
  };

  return (
    <Box sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            backgroundColor: "#f0f2f5",
            }}
        >
        <Typography variant="h4" fontWeight={700}>
            Quiz Generated Successfully!
        </Typography>
        <Stack spacing={2} width="250px">
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleHostQuiz}
            >
                Host Quiz Now
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => navigate("/create")}
            >
                Create Another Quiz
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => navigate("/preview", {state: { questions, summary }})}
            >
                Preview Quiz Answers
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => navigate("/")}
            >
                Back to Home
            </Button>
        </Stack>
    </Box>
  );
}
