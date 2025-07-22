import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProjectHeader from "../components/ProjectHeader";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { getAPIBaseURL } from "../components/APIBaseURL";
import { retrieveJWTFromLocalStorage } from "../assets/jwt-utils";
import SpotlightOverlay from "../components/spotlight";

export default function CreatePage() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  async function handleGenerate() {
    setLoading(true);
    try {
      const jwt = retrieveJWTFromLocalStorage();
      const response = await fetch(getAPIBaseURL() + "/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, jwt }),
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        if (response.status === 401) navigate("/login");
        return;
      }

      const questions = JSON.parse(data.questions);
      const summary = data.summary; // no need to stringify again
      const quizID = data.quizID;

      navigate("/generation_success", { state: { quizID, questions, summary } });
    } catch {
      alert("Something went wrong generating the quiz.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      bgcolor:"white",
      minHeight: "100vh",
      position: "relative",
      }}>
      <SpotlightOverlay/>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: 420,
          minWidth: 420,
          mx: "auto",
          p: 5,
          borderRadius: 3,
          boxShadow: 6,
          bgcolor: "white",
        }}
      > 
      
        <ProjectHeader />
        
        <Typography variant="h5" fontWeight={700} gutterBottom color="primary" mb={3}>
          Generate a New Quiz!
        </Typography>
        <Typography fontWeight={700} whiteSpace={"pre"} letterSpacing={4} gutterBottom color="rgba(119, 119, 119, 1)" mb={5}>
          {"Sky's  the  Limit."}
        </Typography>

        <Stack spacing={3} sx={{width: "100%"}}>
          <TextField
            label="Quiz Topic"
            variant="outlined"
            fullWidth
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={loading}
            autoFocus
          />

          <Button
            variant="contained"
            color="primary"
            disabled={!topic.trim() || loading}
            onClick={handleGenerate}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            sx={{ fontWeight: 700, py: 1.5 }}
          >
            {loading ? "Generating..." : "Generate Quiz"}
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={handleBack}
            disabled={loading}
            sx={{ fontWeight: 700, py: 1.5 }}
          >
            Back
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
