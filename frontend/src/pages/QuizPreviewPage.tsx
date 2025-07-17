import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";

export default function PreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { questions, summary, title } = location.state || {};

  if (!questions || !summary) {
    return (
      <Box p={4}>
        <Typography variant="h6" color="error">
          No quiz data provided.
        </Typography>
      </Box>
    );
  }

  const handlePlay = () => {
    navigate("/play", { state: { questions, title } });
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
            <ListItemText
              primary={`Q${index + 1}: ${q.question}`}
              secondary={
                <ul style={{ margin: 0, paddingLeft: "1.5em" }}>
                  {q.options.map((opt: string, i: number) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              }
            />
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
          onClick={handlePlay}
        >
          Play
        </Button>
      </Stack>
    </Box>
  );
}
