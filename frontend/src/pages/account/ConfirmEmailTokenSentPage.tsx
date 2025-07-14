import { useNavigate } from "react-router-dom";
import { Typography, Button, Grid } from "@mui/material";
import CenteredContainer from "../../components/CenteredContainer.tsx";
import ProjectHeader from "../../components/ProjectHeader.tsx";

export default function ConfirmEmailTokenSentPage() {
  const navigate = useNavigate();

  return (
    <CenteredContainer>
      <ProjectHeader />

      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Verification link sent to your email!
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          Please check your inbox and click the verification link to complete
          your registration.
        </Typography>

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => navigate("/login")}
          sx={{ py: 2 }}
        >
          Go to Log In
        </Button>
      </Grid>
    </CenteredContainer>
  );
}
