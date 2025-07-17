import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { getAPIBaseURL } from "../components/APIBaseURL.tsx";

export default function CreatePage() {
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();

  async function handleGenerate(): Promise<void> {
    try {
      const response = await fetch(getAPIBaseURL() + "/quiz/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      console.log("Response from server:", data);

      if (data.error) {
        alert(data.error);
        console.error("Error generating quiz:", data.error);
        return;
      }

      const questions = JSON.parse(data.questions);
      const summary = JSON.stringify(data.summary);
      const quizID = data.quizID;

      navigate("/generation_success", { 
        state: { quizID, questions, summary },
      });

    } catch (err) {
      alert("Something went wrong generating the quiz.");
    }
  };

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
          disabled={!topic}
          onClick={handleGenerate}
        >
          Generate Quiz
        </Button>
      </Stack>
    </Box>
  );
}