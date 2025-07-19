import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAPIBaseURL } from "../components/APIBaseURL";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import QuizThumbnail from "../components/QuizThumbnail";
import { retrieveJWTFromLocalStorage } from "../assets/jwt-utils";

type QuizHistoryItem = {
  quizGameId: string;
  title: string;
  summary: string;
  topic: string;
};

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState<QuizHistoryItem[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchHistory = async (searchTerm: string) => {
    const jwt = retrieveJWTFromLocalStorage();
    if (!jwt) {
      setError("You must be logged in.");
      return;
    }

    try {
      const res = await fetch(getAPIBaseURL() + "quiz/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jwt }),
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setHistory([]);
        return;
      }

      // Optionally filter by search term locally
      const filtered = data.history.filter((quiz: QuizHistoryItem) =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setHistory(filtered);
      setError("");
    } catch (err) {
      setError("Failed to fetch quiz history.");
    }
  };

  useEffect(() => {
    fetchHistory("");
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearch(term);
    fetchHistory(term);
  };

  const handlePreview = (quiz: QuizHistoryItem) => {
    navigate("/preview", {
      state: {
        quizID: quiz.quizGameId,
        summary: quiz.summary,
        title: quiz.title,
      },
    });
  };

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Quiz History
      </Typography>

      <TextField
        placeholder="Search quizzes..."
        fullWidth
        value={search}
        onChange={handleSearchChange}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      <Grid container spacing={3}>
        {history.length === 0 && !error && (
          <Typography>No quizzes found.</Typography>
        )}

        {history.map((quiz) => (
          
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => handlePreview(quiz)}
            >
              <QuizThumbnail
                title={quiz.title}
                description={quiz.summary || "No description"}
                createdBy={quiz.topic || "No topic"}
                createdAt={""} // add createdAt if available
                playerCount={0} //player count if available
              />
            </Box>
          
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </Box>
  );
}
