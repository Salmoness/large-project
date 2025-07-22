import { Box, Button, Typography, Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { hostQuiz } from "../components/hostQuiz";

export default function GenerationSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { summary, questions, quizID } = location.state || {};

  async function handleHostQuiz(): Promise<void> {
    try {
      const accessCode = await hostQuiz(quizID);
      navigate("/host", { state: { accessCode, summary, quizID } });
    } catch (error) {
      console.error("Error hosting quiz:", error);
      alert("Failed to host the quiz. Please try again.");
    }
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Typography variant="h4" fontWeight={700} color="primary" textAlign="center">
        Quiz Generated Successfully!
      </Typography>

      <Stack spacing={2} sx={{ width: { xs: "100%", sm: 300 } }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleHostQuiz}
          sx={{ fontWeight: 700, py: 1.5 }}
        >
          Host Quiz Now
        </Button>

        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => navigate("/create")}
          sx={{ fontWeight: 700, py: 1.5 }}
        >
          Create Another Quiz
        </Button>

        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => navigate("/preview", { state: { questions, summary } })}
          sx={{ fontWeight: 700, py: 1.5 }}
        >
          Preview Quiz Answers
        </Button>

        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => navigate("/")}
          sx={{ fontWeight: 700, py: 1.5 }}
        >
          Back to Home
        </Button>
      </Stack>
    </Box>
  );
}
