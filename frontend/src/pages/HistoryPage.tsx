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
import { retrieveJWTFromLocalStorage } from "../assets/jwt-utils";

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
        let gamesArray: GameData[] = [];
        try {
            const jwt = retrieveJWTFromLocalStorage();
            const response = await fetch(getAPIBaseURL() + "quiz/searchGame", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ search: term, userId: "1", jwt: jwt}),
            });
            const data = await response.json();
            if (data.error) {
                if (response.status === 401) navigate('/login')
                console.log("error: " + data.error);
                return;
            }

            for (let i=0 ; i < data.games ; i++)
            {

//_id: gamesHostedByUser[i]._id, title: currQuiz.title, summary: currQuiz.summary, questions: currQuiz.questions, players: gamesHostedByUser[i].players
                let game: GameData = {
                    _id: data.games[i]._id,
                    title: data.games[i].title,
                    summary: data.games[i].summary,
                    created_by: "",
                    created_at: new Date(data.games[i].created_at),
                    players: data.games[i].players,
                    questions: data.games[i].questions,
                    }
                gamesArray.push(game);
            }    
            
            games.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            setGames(data.games);
            console.log(games);
        } catch (error) {
            console.error(error);
            return;
        }
    }

    useEffect(() => { 
        checkLoginStatus()
        fetchGames("")
     }, []);

    async function checkLoginStatus() {
        try {
            const payload = JSON.stringify({ jwt: retrieveJWTFromLocalStorage() });
            const response = await fetch(getAPIBaseURL() + "users/verify-login", {
                method: "POST",
                body: payload,
                headers: {"Content-Type": "application/json"}
            })
            console.log("status: " + response.status);
            const data = await response.json();
            if (!data.error) {
                setName(data.username);
            }
        } catch (error) {
            console.log( error)
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
        <Box sx={{ px: 4, py: 6 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
            Hosted Quizzes History
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
            {games.map((game) => (
                <Grid key={game._id}>
                    <Box 
                        onClick={() => handlePreview(game)} 
                        sx={{ cursor: "pointer" }}
                    >
                        <QuizThumbnail
                            title={game.title}
                            description={game.summary || "No description"}
                            createdBy={name || "Unknown"}
                            createdAt={new Date(game.created_at).toLocaleDateString()}
                        />
                    </Box>
                </Grid>
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
        </Box>
    );
}
