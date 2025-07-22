import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Container,
  ToggleButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import QuizThumbnail from "../components/QuizThumbnail";
import { getAPIBaseURL } from "../components/APIBaseURL";
import { retrieveJWTFromLocalStorage } from "../assets/jwt-utils";

type QuizData = {
  _id: string;
  title: string;
  summary: string;
  created_by_username: string;
  created_at: string;
  playerCount: number;
  questions: any[];
};

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [quizzes, setQuizzes] = useState<QuizData[]>([]);
  const [selected, setSelected] = useState(true);
  const navigate = useNavigate();

  const fetchQuizzes = async (term: string) => {
    try {
      const jwt = retrieveJWTFromLocalStorage();
      const response = await fetch(getAPIBaseURL() + "quiz/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search: term, own: !selected, jwt: jwt}),
      });

      const data = await response.json();
      if (data.error) {
        console.error(data.error);
        if (response.status === 401) navigate('/login');
        return;
      }

      setQuizzes(data.quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes(""); // Load all on mount
  }, [selected]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearch(term);
    fetchQuizzes(term);
  };

  const handleToggleChange = () => {
    setSelected(!selected);
    console.log(selected);
  };

  const handlePreview = (quiz: QuizData) => {
    navigate("/preview", {
      state: {
        questions: quiz.questions,
        summary: quiz.summary,
        title: quiz.title,
        quizID: quiz._id,
      },
    });
  };

  return (
    <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", alignItems:"center", px: 4, py: 6 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Browse Quizzes
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "horizontal", mb: 4, width:"40%"}}>
        <ToggleButton
          value="check"
          selected={selected}
          disableRipple
          onChange={handleToggleChange}
          sx={{color: selected ? "white" : "grey", lineHeight: 1.2,}}
        >
          Own Quizzes
      </ToggleButton>

        <TextField
          placeholder="Search quizzes..."
          fullWidth
          value={search}
          onChange={handleSearchChange}
          sx={{ ml: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {quizzes.map((quiz) => (
            <Box key={quiz._id} onClick={() => handlePreview(quiz)} sx={{ cursor: "pointer" }}>
              <QuizThumbnail
                title={quiz.title}
                description={quiz.summary || "No description"}
                createdBy={quiz.created_by_username || "Unknown"}
                createdAt={new Date(quiz.created_at).toLocaleDateString()}
              />
            </Box>
          
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/host_dashboard")}
        sx={{ mt: 4 }}
      >
        Back
      </Button>
    </Container>
  );
}
