import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import QuizThumbnail from "../components/QuizThumbnail";
import { getAPIBaseURL } from "../components/APIBaseURL";

type QuizData = {
  _id: string;
  title: string;
  summary: string;
  created_by: string;
  created_at: string;
  playerCount: number;
  questions: any[];
};

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [quizzes, setQuizzes] = useState<QuizData[]>([]);
  const navigate = useNavigate();

  const fetchQuizzes = async (term: string) => {
    try {
      const response = await fetch(getAPIBaseURL() + "quiz/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search: term }),
      });

      const data = await response.json();
      if (data.error) {
        console.error(data.error);
        return;
      }

      setQuizzes(data.quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes(""); // Load all on mount
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearch(term);
    fetchQuizzes(term);
  };

  const handlePreview = (quiz: QuizData) => {
    navigate("/preview", {
      state: {
        questions: quiz.questions,
        summary: quiz.summary,
        title: quiz.title,
      },
    });
  };

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Browse Quizzes
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

      <Grid container spacing={3}>
        {quizzes.map((quiz) => (
          
            <Box onClick={() => handlePreview(quiz)} sx={{ cursor: "pointer" }}>
              <QuizThumbnail
                title={quiz.title}
                description={quiz.summary || "No description"}
                createdBy={quiz.created_by || "Unknown"}
                createdAt={new Date(quiz.created_at).toLocaleDateString()}
                playerCount={quiz.playerCount || 0}
              />
            </Box>
          
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/host")}
        sx={{ mt: 4 }}
      >
        Back
      </Button>
    </Box>
  );
}
