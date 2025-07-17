import { useState } from "react";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";

type Props = {
  onGenerate: (topic: string) => void;
};

export default function CreateQuizForm({ onGenerate }: Props) {
  const [topic, setTopic] = useState("");

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
        Generate a New Quiz
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="Quiz Topic"
          variant="outlined"
          fullWidth
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <Typography>
          Number of questions: 10 
        </Typography>

        <Button
          variant="contained"
          color="primary"
          disabled={!topic}
          onClick={() => onGenerate(topic)}
        >
          Generate Quiz
        </Button>
      </Stack>
    </Box>
  );
}
