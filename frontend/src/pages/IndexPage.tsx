import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  IconButton,
  Paper
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ProjectHeader from "../components/ProjectHeader";
import CenteredContainer from "../components/CenteredContainer";
import { checkLoginStatus } from "../components/CheckLoginStatus"
import { useEffect } from "react";
import SpotlightOverlay from "../components/spotlight";

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
      <SpotlightOverlay />
      <Paper  sx={{p:10, elevation: 10, border: "solid rgba(60, 77, 224, 0.3)", backdropFilter: "blur(12px)", bgcolor: "rgba(250, 250, 250, 0.42)"
      }}>
        <ProjectHeader />
        <Box
          sx={{
            textAlign: "center",
            mt: -2,
            maxWidth: 700,
            mx: "auto",
          }}
        >
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Test your wits. Beat the clock.
          </Typography>
        </Box>

        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          sx={{ mt: 4, width: "100%", justifyContent: "center", px: 3 }}
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
        <Box sx={{ }}>
          <IconButton
            onClick={() => navigate("/info")}
            sx={{ color: "grey.600", mt: 4}}
            aria-label="Site Info"
          >
            <HelpOutlineIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" color="grey" fontSize={12}>
            Click here to learn more!
          </Typography>
        </Box>
      </Paper>
    </CenteredContainer>
  );
}
