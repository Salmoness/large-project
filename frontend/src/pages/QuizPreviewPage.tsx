import { useLocation, useNavigate } from "react-router-dom";
import { hostQuiz } from "../components/hostQuiz";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import BroadcastOnPersonalIcon from "@mui/icons-material/BroadcastOnPersonal";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import QuizThumbnail from "../components/QuizThumbnail";

export default function PreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { questions, summary, quizID, title,  } = location.state || {};

  if (!questions || !summary) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h6" color="error">
          No quiz data provided.
        </Typography>
      </Box>
    );
  }

  const handleHost = () => {
    hostQuiz(quizID)
      .then((accessCode) => {
        navigate("/host", {
          state: { questions, accessCode, summary, quizID },
        });
      })
      .catch(() => {
        alert("Failed to host the quiz. Please try again.");
      });
  };

  const handleBack = () => {
    navigate(-1);
  };

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

      <Box
        sx={{
          display: "flex",
          gap: 3,
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
          mt: 4,
        }}
      >
        {/* Quiz Thumbnail
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 1 }}>
          <QuizThumbnail
            title={title}
            description={summary}
            createdBy={createdBy || "Unknown"}
            createdAt={createdAt || "Unknown"}
          />
        </Box> */}

        {/* Questions Preview */}
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
            {questions.map((q: any, i: number) => (
              <ListItem
                key={i}
                alignItems="flex-start"
                sx={{ mb: 2, flexDirection: "column", alignItems: "stretch" }}
              >
                <Typography variant="body1" fontWeight="bold" mb={1}>
                  {`Q${i + 1}: ${q.question}`}
                </Typography>
                <List disablePadding>
                  {q.options.map((opt: string, idx: number) => (
                    <ListItem
                      key={`${i}-${idx}`}
                      divider
                      dense
                      sx={{ color: "text.secondary", pl: 3 }}
                    >
                      <Typography>{opt}</Typography>
                    </ListItem>
                  ))}
                </List>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      {/* Fixed Back and Host buttons */}
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          left: 20,
          zIndex: 999,
          pointerEvents: "none",
        }}
      >
        <Box sx={{ pointerEvents: "auto", display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBack}
            sx={{ minWidth: 120 }}
            startIcon={<ArrowBackIosNewIcon />}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<BroadcastOnPersonalIcon />}
            onClick={handleHost}
          >
            Host Quiz
          </Button>
        </Box>
      </Box>
    </Box>
  );
}