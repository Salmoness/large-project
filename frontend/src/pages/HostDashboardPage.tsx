import { Box, Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProjectHeader from "../components/ProjectHeader";

export default function HostPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <Box 
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        backgroundColor: "#f0f2f5",
      }}
    >

      <ProjectHeader />

      <Typography variant="h4" fontWeight={700}>
        Host Dashboard
      </Typography>

      <Stack spacing={2} width="250px">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => navigate("/create")}
        >
          Create Quiz
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => navigate("/browse")}
        >
          Browse Quizzes
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => navigate("/history")}
        >
          History
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          fullWidth
        >
            Back
        </Button>
                

      </Stack>
    </Box>
  );
}
