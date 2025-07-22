import { Box, Typography, Divider, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CenteredContainer from "../components/CenteredContainer";
import ProjectHeader from "../components/ProjectHeader";

export default function InfoPage() {
  const navigate = useNavigate();

  return (
    <CenteredContainer>
      <ProjectHeader />

      <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, px: 2 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          About
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          TrivAI is an AI-powered trivia experience where players race against the clock to answer questions correctly and climb the leaderboard. Whether you're here to test your knowledge, host a game, or just have fun, TrivAI makes it fast, smart, and engaging.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight={600} gutterBottom>
          How it Works
        </Typography>
        <ul>
          <li><strong>Play as Guest:</strong> Join a game using a code and answer questions in real time.</li>
          <li><strong>Host a Game:</strong> Create and host your own quiz sessions as a registered user.</li>
          <li><strong>AI-Powered:</strong> Our system uses AI to help generate quizes on any topic imaginable.</li>
        </ul>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight={600} gutterBottom>
          FAQs
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>Do I need an account to play?</strong> No, you can play as a guest!
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>Is it free?</strong> Yes, completely free to play and host.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          sx={{ mt: 4, fontWeight: 600 }}
        >
          Back to Home
        </Button>
      </Box>
    </CenteredContainer>
  );
}
