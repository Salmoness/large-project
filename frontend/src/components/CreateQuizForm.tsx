import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Stack,
} from "@mui/material";

type Props = {
  onGenerate: (topic: string, questionCount: number) => void;
};

export default function CreateQuizForm({ onGenerate }: Props) {
  const [topic, setTopic] = useState("");
  const [questionCount, setQuestionCount] = useState(5);

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        p: 4,
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: "#ffffff",
      }}
    >
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Create a New Quiz
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="Quiz Topic"
          variant="outlined"
          fullWidth
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <TextField
          select
          label="Number of Questions"
          value={questionCount}
          onChange={(e) => setQuestionCount(Number(e.target.value))}
        >
          {[...Array(16)].map((_, i) => {
            const val = i + 5;
            return (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            );
          })}
        </TextField>

        <Button
          variant="contained"
          color="primary"
          disabled={!topic || questionCount < 5}
          onClick={() => onGenerate(topic, questionCount)}
        >
          Generate Quiz
        </Button>
      </Stack>
    </Box>
  );
}
