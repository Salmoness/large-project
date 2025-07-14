import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAPIBaseURL } from "../components/APIBaseURL.tsx";
import { saveJWTToLocalStorage } from "../assets/jwt-utils.ts";
import ProjectHeader from "../components/ProjectHeader.tsx";
import CenteredContainer from "../components/CenteredContainer.tsx";
import { Box, TextField, Button, Stack } from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function doLogin(): Promise<void> {
    const payload = JSON.stringify({ username: username, password: password });

    try {
      const response = await fetch(getAPIBaseURL() + "users/login", {
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
        navigate("/host");
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
            onClick={() => doLogin()}
            sx={{ py: 2 }}
          >
            Log In
          </Button>

          <p>Don't have an account?</p>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => navigate("/register")}
            sx={{ py: 2 }}
          >
            Register
          </Button>
        </Stack>
      </Box>
    </CenteredContainer>
  );
}
