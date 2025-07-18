import { Box, Button, Typography } from "@mui/material";
import { getAPIBaseURL } from "./APIBaseURL";

type Props = {
  score: number;
  total: number;
  onRestart: () => void;
};

export default function ResultScreen({ score, total, onRestart }: Props) {

  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h4">Finished!</Typography>
      <Typography variant="h6" mt={2}>Score: {score} / {total}</Typography>
      <Button variant="contained" sx={{ mt: 3 }} onClick={onRestart}>
        Try Again
      </Button>
    </Box>
  );
}
