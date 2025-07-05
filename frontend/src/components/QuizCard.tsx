import { Card, CardContent, Typography, Button, Box } from "@mui/material";

type Props = {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
};

export default function QuizCard({ question, options, onAnswer }: Props) {
  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{question}</Typography>
        <Box mt={2}>
          {options.map((opt, i) => (
            <Button
              key={i}
              variant="outlined"
              fullWidth
              sx={{ my: 1 }}
              onClick={() => onAnswer(opt)}
            >
              {opt}
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
