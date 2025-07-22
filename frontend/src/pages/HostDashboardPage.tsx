import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProjectHeader from "../components/ProjectHeader";
import { forgetJWTInLocalStorage } from "../assets/jwt-utils";
// MUI Icons
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import HistoryIcon from "@mui/icons-material/History";
import SearchIcon from "@mui/icons-material/Search";
import SpotlightOverlay from "../components/spotlight";

export default function HostPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    forgetJWTInLocalStorage();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <SpotlightOverlay/>

      {/* Main Buttons */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <ProjectHeader />
        <Stack spacing={2} sx={{ width: 250 }}>
          <Button
            variant="contained"
            color="secondary" 
            fullWidth
            startIcon={<PlayArrowIcon />}
            onClick={() => navigate("/play")}
            sx={{ fontWeight: 700, py: 1.5 }}
          >
            Play
          </Button>
          <Button
            variant="contained"
            color="success" 
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => navigate("/create")}
            sx={{ fontWeight: 700, py: 1.5 }}
          >
            Create
          </Button>

          <Button
            variant="outlined"
            color="primary" 
            fullWidth
            startIcon={<SearchIcon />}
            onClick={() => navigate("/browse")}
            sx={{ fontWeight: 700, py: 1.5 }}
          >
            Browse
          </Button>

          <Button
            variant="contained"
            color="warning" 
            fullWidth
            startIcon={<HistoryIcon />}
            onClick={() => navigate("/history")}
            sx={{ fontWeight: 700, py: 1.5 }}
          >
            History
          </Button>

          
          <Button 
            variant="contained" 
            fullWidth
            color="error" 
            onClick={handleLogout}
            sx={{ m: 4 }}>
            LOGOUT
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
