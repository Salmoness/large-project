import { Box, Button, Typography, Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { getAPIBaseURL } from "../components/APIBaseURL.tsx";
import { hostQuiz } from "../components/hostQuiz.tsx";

export default function GenerationSuccessPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { summary, questions, quizID } = location.state || {};

    async function handleHostQuiz() : Promise<void> {
        hostQuiz(quizID)
        .then((accessCode) => {
            // Navigate to the host page with access code and quiz details
            navigate("/host", { state: { accessCode, summary, quizID } });
        })
        .catch((error) => {
            console.error("Error hosting quiz:", error);
            alert("Failed to host the quiz. Please try again.");
        });
    }
    

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
