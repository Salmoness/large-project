import { Typography, Button, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import CenteredContainer from "../../components/CenteredContainer.tsx";
import ProjectHeader from "../../components/ProjectHeader.tsx";
import { useNavigate } from "react-router-dom";
import { getAPIBaseURL } from "../../components/APIBaseURL.tsx";

export default function ConfirmEmailByTokenPage() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying your email...");
  let pageLoaded = useRef(false); // Workaround to useEffect being ran twice

  useEffect(() => {
    if (pageLoaded.current) return;
    pageLoaded.current = true;
    fetch(getAPIBaseURL() + "users/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    })
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => setMessage(`Error: ${error.message}`));
  }, []);

  return (
    <CenteredContainer>
      <ProjectHeader />

      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {message}
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
