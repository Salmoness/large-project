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
  Paper,
  Collapse,
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CrownIcon from "@mui/icons-material/EmojiEvents";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech"; // silver medal icon
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium"; // bronze medal icon

import QuizThumbnail from "../components/QuizThumbnail";

type LeaderboardData = {
  username: string;
  score: number;
  finishedAt: string;
};

export default function LeaderboardPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [leaderboard, setLeaderboard] = useState<LeaderboardData[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);

  const { questions, summary, title, gameID, createdBy, createdAt } = location.state || {};

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
    try {
      const payload = JSON.stringify({ quizGameID: gameID });
      const response = await fetch(getAPIBaseURL() + "quiz/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });

      const data = await response.json();

      if (data.error) {
        console.log(data.error);
        if (response.status === 401) navigate("/login");
        return;
      }

      setLeaderboard(data.leaderboard);
    } catch (error) {
      console.error("error: " + error);
    }
  };

  useEffect(() => {
    if (questions && summary) handleLeaderboard();
  }, []);

  const handleBack = () => navigate(-1);

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          {title || "Quiz Preview"}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {summary}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box
        sx={{
          display: "flex",
          gap: 3,
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* Quiz Thumbnail Section */}
        <Box
          onClick={() => setPreviewOpen((prev) => !prev)}
          sx={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            mt: 2,
          }}
        >
          <QuizThumbnail
            title={title}
            description={summary}
            createdBy={createdBy || "Unknown"}
            createdAt={createdAt || "Unknown"}
          />
          {!previewOpen && (
            <Typography variant="body2" color="text.secondary" mt={1}>
              Click to expand
            </Typography>
          )}
        </Box>

        {/* Collapsible Questions List */}
        <Collapse in={previewOpen} timeout="auto" unmountOnExit>
          <Paper
            elevation={3}
            sx={{
              mt: 2,
              p: 2,
              maxHeight: 500,
              overflowY: "auto",
              width: 600,
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Questions
            </Typography>
            <List>
              {questions.map((q: any, index: number) => (
                <ListItem key={index} alignItems="flex-start" sx={{ mb: 2 }}>
                  <Box>
                    <Typography variant="body1">{`Q${index + 1}: ${q.question}`}</Typography>
                    <List>
                      {q.options.map((opt: string) => (
                        <ListItem divider dense key={opt} sx={{ color: "#696969ff" }}>
                          {opt}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Collapse>

        {/* Leaderboard */}
        <Paper
          elevation={3}
          sx={{
            flex: 1.5,
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            maxWidth: 700,
            mt: 2,
          }}
        >
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Leaderboard
          </Typography>
          <Box
            p={1}
            width="100%"
            sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
          >
            {leaderboard.map((p, index) => {
              let icon = null;
              let color = "inherit";
              let fontWeight = "normal";

              if (index === 0) {
                icon = <CrownIcon sx={{ color: "#bd8c11ff", mr: 1, fontSize: 28 }} />; // darker gold
                color = "#b8860b";
                fontWeight = "bold";
              } else if (index === 1) {
                icon = <MilitaryTechIcon sx={{ color: "#555759", mr: 1, fontSize: 26 }} />; // darker silver
                color = "#555759";
                fontWeight = "bold";
              } else if (index === 2) {
                icon = <WorkspacePremiumIcon sx={{ color: "#cd7f32", mr: 1, fontSize: 26 }} />; // bronze
                color = "#cd7f32";
                fontWeight = "bold";
              }

              return (
                <ListItem key={index} alignItems="flex-start" sx={{ mb: 1, pt: 0 }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", alignItems: "center", color }}>
                        {icon}
                        <Typography
                          variant="h6"
                          fontWeight={fontWeight}
                          component="span"
                          ml={0.5}
                        >
                          {`#${index + 1}: ${p.username}`}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: 16 }}>
                        {`Score: ${p.score}`}
                      </Typography>
                    }
                  />
                </ListItem>
              );
            })}
          </Box>
        </Paper>
      </Box>

      {/* Fixed Back Button with arrow */}
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
    </Box>
  );
}
