import { Link } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import leafLogo from "../assets/leaf.png";

export default function ProjectHeader() {
  return (
    <Box
      component={Link}
      to="/host_dashboard"
      sx={{
        textDecoration: "none",
        color: "inherit",
        display: "inline-block",
        mb: 4,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          component="img"
          src={leafLogo}
          alt="TrivAI Logo"
          sx={{
            height: 64,
            width: "auto",
            filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.2))",
          }}
        />
        <Typography
          variant="h3"
          fontWeight={800}
          sx={{
            fontFamily: `'Poppins', 'Quicksand', 'Segoe UI', sans-serif`,
            letterSpacing: 1.5,
            textShadow: "1px 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Box component="span" sx={{ color: "#4CAF50" }}>
            Triv
          </Box>
          <Box component="span" sx={{ color: "#2196F3" }}>
            AI
          </Box>
        </Typography>
      </Stack>
    </Box>
  );
}
