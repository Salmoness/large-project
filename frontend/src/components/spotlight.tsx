import { Box } from "@mui/material";

export default function SpotlightOverlay() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1300, // higher than modal/dialog
        pointerEvents: "none", // so it doesn't block clicks
        background: `
          radial-gradient(
            circle at 50% 50%, 
            transparent 40%, 
            rgba(0, 60, 255, 0.4) 100%
          )
        `,
        transition: "background 0.3s ease",
      }}
    />
  );
}