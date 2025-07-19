import { Typography, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import CenteredContainer from "../../components/CenteredContainer.tsx";
import ProjectHeader from "../../components/ProjectHeader.tsx";
import { getAPIBaseURL } from "../../components/APIBaseURL.tsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordByTokenPage() {
  const [password, setNewPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();
  const [message, setMessage] = useState("Type your new password here:");


  function doReset() {

    console.log("problem");
    fetch(getAPIBaseURL() + "users/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, token }),
    })
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => setMessage(`Error: ${error.message}`));
      navigate("/login");
  }

  return (
    <CenteredContainer>
      <ProjectHeader />


      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {message}
        </Typography>

        <TextField
          label="Type New Password"
          variant="outlined"
          placeholder="New Password"
          fullWidth
          value={password}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => doReset()}
          sx={{ py: 2 }}
        >
          Reset Password
        </Button>
      </Grid>
    </CenteredContainer>
  );
}
