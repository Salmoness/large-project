import { Box, Button, Typography, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function HostPage() {
    //const navigate = useNavigate();
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
            gap: 4,
            backgroundColor: "#f0f2f5",
        }}
    >
        <Typography variant="h4" fontWeight={700}>
            Access code:  {accessCode}
        </Typography>
        <Typography variant="h6" fontWeight={500}>
            Summary: {summary}
        </Typography>
        <Typography variant="h6" fontWeight={500}>
            Quiz ID: {quizID}
        </Typography>
        <Button>nothing</Button>
        <Stack>nothing</Stack>
    </Box>
  );
}
