import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

type Props = {
  onStart: (name: string) => void;
};

export default function StartScreen({ onStart }: Props) {
  const [name, setName] = useState("");

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>Trivia Game</Typography>
      <TextField
        label="Enter your name"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant="contained" onClick={() => onStart(name)} disabled={!name}>
        Start
      </Button>
    </Box>
  );
}
