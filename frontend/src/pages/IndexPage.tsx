import ProjectHeader from "../components/ProjectHeader.tsx";
import CenteredContainer from "../components/CenteredContainer.tsx";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";

export default function IndexPage() {
  const navigate = useNavigate();

  return (
    <CenteredContainer>
      <ProjectHeader />

      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => navigate("/play")}
          sx={{ py: 2 }}
        >
          Play
        </Button>

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => navigate("/login")}
          sx={{ py: 2 }}
        >
          Host
        </Button>
      </Grid>
    </CenteredContainer>
  );
}
