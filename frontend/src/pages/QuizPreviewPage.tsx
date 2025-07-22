import { useLocation, useNavigate } from "react-router-dom";
import { hostQuiz } from "../components/hostQuiz";
import {
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  Stack,
} from "@mui/material";

export default function PreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { questions, summary, quizID, title } = location.state || {};

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
        navigate("/host", { state: { questions, accessCode, summary, quizID } });
      })
      .catch(() => {
        alert("Failed to host the quiz. Please try again.");
      });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ px: 4, py: 6, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        {title || "Quiz Preview"}
      </Typography>
      <Typography variant="subtitle1" gutterBottom color="text.secondary">
        {summary}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <List>
        {questions.map((q: any, i: number) => (
          <ListItem key={i} alignItems="flex-start" sx={{ mb: 2, flexDirection: "column", alignItems: "stretch" }}>
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

      <Stack direction="row" spacing={2} mt={4} justifyContent="center">
        <Button variant="contained" color="primary" onClick={handleBack} sx={{ minWidth: 120 }}>
          Back
        </Button>
        <Button variant="contained" color="success" onClick={handleHost} sx={{ minWidth: 120 }}>
          Host Quiz
        </Button>
      </Stack>
    </Box>
  );
}
