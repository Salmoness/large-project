import { Grid, Box, Typography } from "@mui/material";
import QuizThumbnail from "../components/QuizThumbnail";

// Match the props QuizThumbnail expects
type QuizData = {
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  playerCount: number;
};

const mockQuizzes: QuizData[] = [
  {
    title: "JavaScript Basics",
    description: "A quiz on JS fundamentals",
    createdBy: "Zid",
    createdAt: "2025-06-30",
    playerCount: 24,
  },
  {
    title: "World Capitals",
    description: "Test your geography knowledge",
    createdBy: "Alex",
    createdAt: "2025-07-01",
    playerCount: 12,
  },
  {
    title: "History 101",
    description: "Intro to world history",
    createdBy: "Jordan",
    createdAt: "2025-06-15",
    playerCount: 19,
  },
  {
    title: "React Quick Test",
    description: "Quick React quiz for devs",
    createdBy: "Sam",
    createdAt: "2025-07-12",
    playerCount: 34,
  },
];

export default function BrowsePage() {
  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Browse Quizzes
      </Typography>

      <Grid container spacing={3}>
        {mockQuizzes.map((quiz) => (
          
            <QuizThumbnail
              title={quiz.title}
              description={quiz.description}
              createdBy={quiz.createdBy}
              createdAt={quiz.createdAt}
              playerCount={quiz.playerCount}
            />
        
        ))}
      </Grid>
    </Box>
  );
}
