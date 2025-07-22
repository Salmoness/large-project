
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E3A8A",       // Deep Indigo Blue
      contrastText: "#fff",
    },
    secondary: {
      main: "#10B981",       // Emerald Green
      contrastText: "#fff",
    },
    error: {
      main: "#EF4444",       // Bright Red
      contrastText: "#fff",
    },
    warning: {
      main: "#F59E0B",       // Warm Amber
      contrastText: "#fff",
    },
    info: {
      main: "#3B82F6",       // Vivid Blue
      contrastText: "#fff",
    },
    success: {
      main: "#22C55E",       // Fresh Green
      contrastText: "#fff",
    },
    background: {
      default: "#F9FAFB",    // Light Grayish
      paper: "#FFFFFF",
    },
    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica Neue', Arial, sans-serif`,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    button: {
      textTransform: "none",
      fontWeight: 600,
      fontSize: "1rem",
      letterSpacing: "0.03em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 24px",
          boxShadow:
            "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition:
            "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease",
          "&:hover": {
            boxShadow:
              "0 8px 20px rgba(0, 0, 0, 0.15)",
            transform: "translateY(-2px)",
          },
          "&:active": {
            transform: "translateY(0)",
            boxShadow:
              "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow:
            "0 2px 12px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          borderRadius: 12,
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            transition:
              "box-shadow 0.3s ease, border-color 0.3s ease",
            "&.Mui-focused": {
              boxShadow:
                "0 0 8px 2px rgba(59, 130, 246, 0.4)", // info main glow
              borderColor: "#3B82F6",
            },
          },
        },
      },
    },
  },
});

export default theme;
