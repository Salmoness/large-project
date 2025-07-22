import { Box, Button, Typography, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function HostPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { accessCode, summary, quizID } = location.state || {};

  const handleBack = () => {
    navigate("/host_dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 3,
        py: 6,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
        Access Code: {accessCode || "N/A"}
      </Typography>

      <Typography
        variant="subtitle1"
        fontWeight={500}
        color="text.secondary"
        sx={{ maxWidth: 600, mb: 2 }}
      >
        {summary || "No summary available."}
      </Typography>

      {/* {quizID && (
        <Typography variant="body1" color="text.secondary">
          <strong>Quiz ID:</strong> {quizID}
        </Typography>
      )} */}

      <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          startIcon={<ArrowBackIosNewIcon />}
          sx={{ minWidth: 120, fontWeight: 600 }}
        >
          Back
        </Button>
      </Stack>
    </Box>
  );
}
