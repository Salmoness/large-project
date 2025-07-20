import { Box, Typography, Button } from "@mui/material";

type Props = {
  score: number;
  total: number;
  correctCount: number;
  totalQuestions: number;
  onRestart: () => void;
};

export default function ResultScreen({
  score,
  total,
  correctCount,
  totalQuestions,
  onRestart,
}: Props) {
  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Quiz Completed!
      </Typography>

      <Typography variant="h6" gutterBottom>
        Final Score: {score} / {total}
      </Typography>

      <Typography variant="body1" gutterBottom>
        Correct Answers: {correctCount} / {totalQuestions}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={onRestart}
        sx={{ mt: 3 }}
      >
        Restart Quiz
      </Button>
    </Box>
  );
}
