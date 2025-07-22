import { Box, Button, Typography, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function HostPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { accessCode, summary, quizID } = location.state || {};

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        bgcolor: "background.default",
        px: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
        Access Code: {accessCode || "N/A"}
      </Typography>

      <Typography variant="h6" fontWeight={500} sx={{ maxWidth: 500 }}>
        Summary: {summary || "No summary available."}
      </Typography>

      {quizID && (
        <Typography variant="h6" fontWeight={500}>
          Quiz ID: {quizID}
        </Typography>
      )}

      <Stack spacing={2} sx={{ mt: 4, width: 200 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/host_dashboard")}
          sx={{ fontWeight: 700, py: 1.5 }}
        >
          Back to Dashboard
        </Button>
      </Stack>
    </Box>
  );
}
