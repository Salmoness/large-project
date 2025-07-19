import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { getAPIBaseURL } from "../components/APIBaseURL.tsx";

export default function CreatePage() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  async function handleGenerate(): Promise<void> {
  setLoading(true);
  try {
    const token = localStorage.getItem("userAuthToken");
    const response = await fetch(getAPIBaseURL() + "/quiz/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic, jwt: token }),
    });

    const data = await response.json();

    if (data.jwt && data.jwt !== token) {
      localStorage.setItem("userAuthToken", data.jwt);
    }

    if (data.error) {
      alert(data.error);
      console.error("Error generating quiz:", data.error);
      setLoading(false);
      return;
    }

    const questions = JSON.parse(data.questions);
    const summary = data.summary;  // it's already a string, no need for JSON.stringify
    const quizID = data.quizID;

    navigate("/generation_success", {
      state: { quizID, questions, summary },
    });
  } catch (err) {
    alert("Something went wrong generating the quiz.");
  } finally {
    setLoading(false);
  }
}


  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        p: 4,
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: "#ffffff",
      }}
    >
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Generate a New Quiz
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="Quiz Topic"
          variant="outlined"
          fullWidth
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          disabled={!topic || loading}
          onClick={handleGenerate}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          disabled={loading}
        >
          Back
        </Button>
      </Stack>
    </Box>
  );
}
