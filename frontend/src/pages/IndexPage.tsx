import ProjectHeader from "../components/ProjectHeader.tsx";
import CenteredContainer from "../components/CenteredContainer.tsx";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";

export default function IndexPage() {
  const navigate = useNavigate();

  return (
    <CenteredContainer>
      <ProjectHeader />

      {/* Buttons in a grid */}
      <Grid container spacing={2}>
        {/* Top full-width button */}
        <Grid size={{ xs: 12 }}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={() => navigate("/play")}
            sx={{ py: 2 }}
          >
            Play
          </Button>
        </Grid>

        {/* Two side-by-side buttons */}
        <Grid size={{ xs: 6 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
            sx={{ py: 2 }}
          >
            Log In
          </Button>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => navigate("/register")}
            sx={{ py: 2 }}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </CenteredContainer>
  );
}
