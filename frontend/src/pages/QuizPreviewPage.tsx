import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";

export default function QuizPreviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { summary, questions } = location.state || {};

  if (!questions) {
    return <Typography>No quiz data. Please generate a quiz first.</Typography>;
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Quiz Preview
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Summary: {summary}
      </Typography>

      <List>
        {questions.map((q: any, index: number) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemText
              primary={`Q${index + 1}: ${q.question}`}
              secondary={q.options.join(" | ")}
            />
          </ListItem>
        ))}
      </List>

      <Button variant="contained" color="primary" onClick={() => navigate("/host")}>
        Back to Host
      </Button>
    </Box>
  );
}
