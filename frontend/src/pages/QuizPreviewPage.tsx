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

  if (!questions || !summary) { // todo: handle case where no quiz data is provided
    return (
      <Box p={4}>
        <Typography variant="h6" color="error">
          No quiz data provided.
        </Typography>
      </Box>
    );
  }

  const handleHost = () => {
    hostQuiz(quizID)
      .then((accessCode) => {
        // Navigate to the host page with access code and quiz details
        navigate("/host", { state: { questions, accessCode, summary, quizID } });
      })
      .catch((error) => {
        console.error("Error hosting quiz:", error);
        alert("Failed to host the quiz. Please try again.");
      });
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        {title || "Quiz Preview"}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {summary}
      </Typography>

      <Divider sx={{ my: 3 }} />

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

      <Stack direction="row" spacing={2} mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
        >
          Back
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={handleHost}
        >
          Host Quiz
        </Button>
      </Stack>
    </Box>
  );
}
