import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAPIBaseURL } from "../components/APIBaseURL";

import {
    Box,
    Typography,
    Button,
    Divider,
    List,
    ListItem,
    ListItemText,
    Stack,
    Paper
} from "@mui/material";

type LeaderboardData = {
    username: String,
    score: Number,
    finishedAt: String,
};

export default function LeaderboardPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [leaderboard, setLeaderboard] = useState<LeaderboardData[]>([]);

    const { questions, summary, title, gameID } = location.state || {};



    if (!questions || !summary) {
        return (
            <Box p={4}>
                <Typography variant="h6" color="error">
                    No quiz data provided.
                </Typography>
            </Box>
        );
    }

    const handleLeaderboard = async () => {
        console.log(gameID);
        const payload = JSON.stringify({quizGameID: gameID});
        console.log(payload);
        try {
            const response = await fetch(getAPIBaseURL() + "quiz/leaderboard", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: payload,
            });

            console.log("is this reaching")
            const data = await response.json();
            if (data.error) {
                console.log(data.error);
                if (response.status === 401) navigate('/login');
            }
            console.log(data)
            setLeaderboard(data.leaderboard);
            console.log("Leaderboard: " + leaderboard);
        } catch (error) {
            console.error("error: " + error)
        }
    }

    useEffect(() => {
        if (!questions || !summary) {
            return
        } else{
            handleLeaderboard(); 
        }
    }, []);

    const handleBack = () => {
        navigate(-1); // Go back to previous page
    };

    return (
        <Box sx={{ px: 4, py: 6 }}>
            <Box sx={{ display:"flex ", flexDirection: "column", alignItems:"center"}}>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                    {title || "Quiz Preview"}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {summary}
                </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ p: 3, display:"flex ", flexDirection: "row", justifyContent:"center"}}>
                <Paper elevation={3} sx={{ mx: "10px", display: "flex", flexDirection:"column", height:"", p: 2, justifyContent: "center", alignItems: "center"}}>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                        Questions
                    </Typography>
                    <List>
                    {questions.map((q: any, index: number) => (
                        <ListItem key={index} alignItems="flex-start" sx={{ mb: 2 }}>
                            <Box>
                                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                {`Q${index + 1}: ${q.question}`}
                                </Typography>
                                <List>
                                {q.options.map((opt: string, optIndex: number) => (
                                    <ListItem
                                    key={`${index}-${optIndex}`} // Ensures uniqueness
                                    divider
                                    dense
                                    sx={{ color: "#696969ff", pl: 2 }}
                                    >
                                    <Typography>{opt}</Typography>
                                    </ListItem>
                                ))}
                                </List>
                            </Box>
                        </ListItem>
                    ))}
                    </List>
                </Paper>
                <Paper elevation={3} sx={{ mx: "10px", display: "flex", flexDirection:"column", height:"", p: 2, justifyContent: "center", alignItems: "center"}}>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                        Leaderboard
                    </Typography>
                    <Box p={3}>
                        {leaderboard.map((p: any, index: number) => (
                        <ListItem key={index} alignItems="flex-start" sx={{ mb: 2 }}>
                            <ListItemText
                                primary={`#${index + 1}: ${p.username}`}
                                secondary={`Score: ${p.score}`}
                            />
                        </ListItem>
                        ))}
                    </Box>
                </Paper>
            </Box>

            <Stack direction="row" spacing={2} mt={4} sx={{justifyContent:"center"}}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBack}
                    fullWidth
                >
                    Back
                </Button>
            </Stack>
        </Box>
    );
}
