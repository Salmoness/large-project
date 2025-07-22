import { Link } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import leafLogo from "../assets/leaf.png";

export default function ProjectHeader() {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        textDecoration: "none",
        color: "inherit",
        display: "inline-block",
        mb: 3,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <img
          src={leafLogo}
          alt="TrivAI Logo"
          style={{ height: 40, width: "auto" }}
        />
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            fontFamily: `'Poppins', 'Quicksand', 'Segoe UI', sans-serif`,
            letterSpacing: 1,
          }}
        >
          <Box component="span" sx={{ color: "#4CAF50" /* green */ }}>
            Triv
          </Box>
          <Box component="span" sx={{ color: "#2196F3" /* blue */ }}>
            AI
          </Box>
        </Typography>
      </Stack>
    </Box>
  );
}
