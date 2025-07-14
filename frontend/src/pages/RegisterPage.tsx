import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAPIBaseURL } from "../components/APIBaseURL.tsx";
import ProjectHeader from "../components/ProjectHeader.tsx";
import CenteredContainer from "../components/CenteredContainer.tsx";
import { Box, TextField, Button, Stack } from "@mui/material";
import { saveJWTToLocalStorage } from "../assets/jwt-utils.ts";

export default function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function doRegister(): Promise<void> {
    const payload = JSON.stringify({
      username: username,
      password: password,
      email: email,
    });

    try {
      const response = await fetch(getAPIBaseURL() + "users/register", {
        method: "POST",
        body: payload,
        headers: { "Content-Type": "application/json" },
      });
      const res = await response.json();
      if (res.error) {
        setMessage(res.error);
      } else {
        saveJWTToLocalStorage(res.jwt);
        setMessage("");
        navigate("/account/registration-email-sent");
      }
    } catch (error: any) {
      setMessage("Service unavailable. Try again later!");
      return;
    }
  }

  return (
    <CenteredContainer>
      <ProjectHeader />
      <Box width="100%">
        <Stack spacing={3}>
          <TextField
            label="Username"
            variant="outlined"
            placeholder="Username"
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="Email"
            variant="outlined"
            placeholder="Email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            variant="outlined"
            type="password"
            placeholder="Password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />

          <p id="statusMessage">{message}</p>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => doRegister()}
            sx={{ py: 2 }}
          >
            Register
          </Button>

          <p>Already have an account?</p>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => navigate("/login")}
            sx={{ py: 2 }}
          >
            Log In
          </Button>
        </Stack>
      </Box>
    </CenteredContainer>
  );
}
