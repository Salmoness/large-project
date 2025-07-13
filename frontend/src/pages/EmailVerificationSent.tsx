import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

export default function EmailVerificationSent() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        bgcolor: "#f5f5f5",
        p: 3,
      }}
    >
      <Button
        variant="outlined"
        onClick={() => navigate("/")}
        sx={{ position: "absolute", top: 16, left: 16 }}
      >
        ← Back to Homepage
      </Button>
      <Typography variant="h4" gutterBottom>
        An Email Verification has Been Sent!
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center">
        Please check your inbox and click the verification link to complete your registration.
      </Typography>
    </Box>
  );
}