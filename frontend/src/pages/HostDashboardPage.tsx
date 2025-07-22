import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProjectHeader from "../components/ProjectHeader";

// MUI Icons
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import HistoryIcon from "@mui/icons-material/History";
import SearchIcon from "@mui/icons-material/Search";

export default function HostPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
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
      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          p: 2,
        }}
      >
        <Button variant="text" size="small" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Project Header */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ProjectHeader />
      </Box>

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
        <Stack spacing={2} sx={{ width: 250 }}>
          <Button
            variant="contained"
            color="success" // green
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => navigate("/create")}
            sx={{ fontWeight: 700, py: 1.5 }}
          >
            Create
          </Button>

          <Button
            variant="outlined"
            color="primary" // blue
            fullWidth
            startIcon={<SearchIcon />}
            onClick={() => navigate("/browse")}
            sx={{ fontWeight: 700, py: 1.5 }}
          >
            Browse
          </Button>

          <Button
            variant="outlined"
            color="warning" // orange
            fullWidth
            startIcon={<HistoryIcon />}
            onClick={() => navigate("/history")}
            sx={{ fontWeight: 700, py: 1.5 }}
          >
            History
          </Button>

          <Button
            variant="contained"
            color="secondary" // purple
            fullWidth
            startIcon={<PlayArrowIcon />}
            onClick={() => navigate("/play")}
            sx={{ fontWeight: 700, py: 1.5 }}
          >
            Play
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
