import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import QuizThumbnail from "../components/QuizThumbnail";
import { getAPIBaseURL } from "../components/APIBaseURL";
import { retrieveJWTFromLocalStorage } from "../assets/jwt-utils";
import ProjectHeader from "../components/ProjectHeader";

type GameData = {
  _id: string;
  title: string;
  summary: string;
  created_by: string;
  created_at: Date;
  players: number;
  questions: any[];
};

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [games, setGames] = useState<GameData[]>([]);
  const navigate = useNavigate();

  const fetchGames = async (term: string) => {
    try {
      const jwt = retrieveJWTFromLocalStorage();
      const response = await fetch(getAPIBaseURL() + "quiz/searchGame", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search: term, userId: "1", jwt }),
      });
      const data = await response.json();

      if (data.error) {
        if (response.status === 401) navigate("/login");
        console.error("error: " + data.error);
        return;
      }

      const gamesArray: GameData[] = [];

      for (let i = 0; i < (data.games?.length || 0); i++) {
        const game = data.games[i];
        gamesArray.push({
          _id: game._id,
          title: game.title,
          summary: game.summary,
          created_by: "", // or populate if available
          created_at: new Date(game.created_at),
          players: game.players,
          questions: game.questions,
        });
      }

      gamesArray.sort(
        (a, b) => b.created_at.getTime() - a.created_at.getTime()
      );

      setGames(gamesArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
    fetchGames("");
  }, []);

  async function checkLoginStatus() {
    try {
      const payload = JSON.stringify({ jwt: retrieveJWTFromLocalStorage() });
      const response = await fetch(getAPIBaseURL() + "users/verify-login", {
        method: "POST",
        body: payload,
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!data.error) {
        setName(data.username);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearch(term);
    fetchGames(term);
  };

  const handlePreview = (quiz: GameData) => {
    navigate("/leaderboard", {
      state: {
        questions: quiz.questions,
        summary: quiz.summary,
        title: quiz.title,
        gameID: quiz._id,
      },
    });
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
      }}
    >
      <Box sx={{ alignSelf: "flex-start", mb: 3 }}>
        <ProjectHeader />
      </Box>

      <Typography variant="h4" fontWeight={700} gutterBottom>
        Hosted Quizzes History
      </Typography>

      <TextField
        placeholder="Search quizzes..."
        fullWidth
        value={search}
        onChange={handleSearchChange}
        sx={{ mb: 4, maxWidth: 500 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3} justifyContent="center" sx={{ width: "100%" }}>
        {games.length === 0 ? (
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 4 }}>
            No hosted quizzes found.
          </Typography>
        ) : (
          games.map((game) => (
            <Box
              key={game._id}
              onClick={() => handlePreview(game)}
              sx={{ cursor: "pointer" }}
            >
              <QuizThumbnail
                title={game.title}
                description={game.summary || "No description"}
                createdBy={name || "Unknown"}
                createdAt={game.created_at.toLocaleDateString()}
              />
            </Box>
          ))
        )}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/host_dashboard")}
        sx={{ mt: 6, borderRadius: 3, px: 5, py: 1.5, fontWeight: 700 }}
      >
        Back
      </Button>
    </Container>
  );
}
