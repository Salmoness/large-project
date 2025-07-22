// BrowsePage.tsx
import { useEffect, useState } from "react";
import ProjectHeader from "../components/ProjectHeader";
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import QuizThumbnail from "../components/QuizThumbnail";
import { getAPIBaseURL } from "../components/APIBaseURL";
import { retrieveJWTFromLocalStorage } from "../assets/jwt-utils";

const toggleOptions = [
  { label: "My Quizzes", value: "own" },
  { label: "All Quizzes", value: "all" },
];

function ToggleSelector({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (val: string) => void;
}) {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {toggleOptions.map((option) => (
        <Button
          key={option.value}
          variant={selected === option.value ? "contained" : "outlined"}
          color="primary"
          onClick={() => onChange(option.value)}
          sx={{
            borderRadius: "9999px",
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            py: 1,
            minWidth: 120,
            boxShadow:
              selected === option.value
                ? "0 4px 12px rgba(30, 58, 138, 0.4)"
                : "none",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow:
                selected === option.value
                  ? "0 6px 16px rgba(30, 58, 138, 0.6)"
                  : "0 2px 6px rgba(30, 58, 138, 0.15)",
            },
          }}
        >
          {option.label}
        </Button>
      ))}
    </Box>
  );
}

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
  const [selected, setSelected] = useState("all");
  const navigate = useNavigate();

  const fetchQuizzes = async (term: string, own: boolean) => {
    try {
      const jwt = retrieveJWTFromLocalStorage();
      const response = await fetch(getAPIBaseURL() + "quiz/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search: term, own, jwt }),
      });

      if (response.status === 401) {
        navigate("/login");
        return;
      }

      const data = await response.json();

      if (data.error) {
        console.error("API error:", data.error);
        return;
      }

      setQuizzes(data.quizzes || []);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes(search, selected === "own");
  }, [selected]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearch(term);
    fetchQuizzes(term, selected === "own");
  };

  const handleBack = () => {
    navigate("/host_dashboard");
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: { xs: 2, sm: 4 },
        py: 6,
        minHeight: "100vh",
        bgcolor: "background.default",
        position: "relative",
      }}
    >
      <Box sx={{ alignSelf: "flex-start", mb: 3 }}>
        <ProjectHeader />
      </Box>

      <Typography variant="h4" fontWeight={700} gutterBottom>
        Browse Quizzes
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 5,
          width: { xs: "100%", sm: "60%", md: "45%", lg: "35%" },
          gap: 3,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <ToggleSelector selected={selected} onChange={setSelected} />

        <TextField
          placeholder="Search quizzes..."
          value={search}
          onChange={handleSearchChange}
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            sx: {
              bgcolor: "background.paper",
              borderRadius: 3,
              boxShadow: 3,
              border: "none",
              "& fieldset": { border: "none" },
              "&:hover fieldset": { border: "none" },
              "&.Mui-focused fieldset": {
                border: "none",
                boxShadow: "0 0 8px 2px rgba(59, 130, 246, 0.4)",
              },
            },
          }}
          sx={{ minWidth: 240, maxWidth: 400 }}
        />
      </Box>

      <Grid container spacing={4} justifyContent="center" sx={{ width: "100%" }}>
        {quizzes.length === 0 ? (
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 4 }}>
            No quizzes found.
          </Typography>
        ) : (
          quizzes.map((quiz) => (
            <Box
              key={quiz._id}
              onClick={() =>
                navigate("/preview", {
                  state: {
                    questions: quiz.questions,
                    summary: quiz.summary,
                    title: quiz.title,
                    quizID: quiz._id,
                  },
                })
              }
              sx={{ cursor: "pointer" }}
            >
              <QuizThumbnail
                title={quiz.title}
                description={quiz.summary || "No description"}
                createdBy={quiz.created_by_username || "Unknown"}
                createdAt={new Date(quiz.created_at).toLocaleDateString()}
              />
            </Box>
          ))
        )}
      </Grid>

      {/* Fixed Back button bottom-left */}
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          left: 20,
          zIndex: 999,
          pointerEvents: "none",
        }}
      >
        <Box sx={{ pointerEvents: "auto" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBack}
            sx={{ minWidth: 120 }}
            startIcon={<ArrowBackIosNewIcon />}
          >
            Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
