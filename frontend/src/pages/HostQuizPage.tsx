import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function HostPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { accessCode, summary } = location.state || {};
    

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
        <Button 
            variant="contained"
            color="primary"
            onClick={() => navigate("/host_dashboard")}>Back to Dashboard</Button>
    </Box>
  );
}
