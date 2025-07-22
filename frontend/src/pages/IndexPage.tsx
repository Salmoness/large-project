import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ProjectHeader from "../components/ProjectHeader";
import CenteredContainer from "../components/CenteredContainer";
import { checkLoginStatus } from "../components/CheckLoginStatus"
import { useEffect } from "react";

export default function IndexPage() {

  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  async function checkLogin() {
    const isLoggedIn = await checkLoginStatus();
    if (!isLoggedIn) {
      navigate("/host_dashboard");
    }
  } 
  
  
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <CenteredContainer>
      
      <Box sx={{ position: "absolute", top: 20, right: 20 }}>
        <IconButton
          onClick={() => navigate("/info")}
          sx={{ color: "grey.600" }}
          aria-label="Site Info"
        >
          <HelpOutlineIcon fontSize="large" />
        </IconButton>
      </Box>

      
      <ProjectHeader />

      <Box
        sx={{
          textAlign: "center",
          mt: 6,
          maxWidth: 700,
          mx: "auto",
        }}
      >
        <Typography variant="h6" color="text.secondary" sx={{ mb: 5 }}>
          Test your wits. Beat the clock.
        </Typography>
      </Box>

      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={2}
        sx={{ mt: 2, width: "100%", justifyContent: "center", px: 3 }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/play")}
          sx={{ py: 2, px: 4, fontSize: "1.1rem", fontWeight: 600 }}
        >
          Play as Guest
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/login")}
          sx={{ py: 2, px: 4, fontSize: "1.1rem", fontWeight: 600 }}
        >
          Login
        </Button>
      </Stack>
    </CenteredContainer>
  );
}
