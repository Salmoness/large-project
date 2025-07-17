import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAPIBaseURL } from "../components/APIBaseURL.tsx";
import { saveJWTToLocalStorage } from "../assets/jwt-utils.ts";
import ProjectHeader from "../components/ProjectHeader.tsx";
import CenteredContainer from "../components/CenteredContainer.tsx";
import { Box, TextField, Button, Stack, Typography, Link } from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  async function doLogin(): Promise<void> {
    if (!username || !password) {
      setMessage("Please enter both username and password.");
      return;
    }

    const payload = JSON.stringify({ username, password });

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
    }
  }

  function handleForgotPasswordSubmit() {
    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    //TODO: API to send a reset email
    setEmailSent(true);
    setMessage("If an account exists with that email, a reset link was sent.");
  }

  return (
    <CenteredContainer>
      <ProjectHeader />
      <Box width="100%">
        <Stack spacing={3}>
          {!forgotPassword ? (
            <>
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
                onKeyDown={(e) => e.key === "Enter" && doLogin()}
              />

              {message && (
                <Typography color="error" fontWeight="500">
                  {message}
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={doLogin}
                sx={{ py: 2 }}
              >
                Login
              </Button>

              <Link
                component="button"
                variant="body2"
                onClick={() => setForgotPassword(true)}
                sx={{ alignSelf: "center" }}
              >
                Forgot password?
              </Link>

              <Typography align="center">Don't have an account?</Typography>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => navigate("/register")}
                sx={{ py: 2 }}
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <TextField
                label="Email Address"
                variant="outlined"
                placeholder="Enter your email"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />

              {message && (
                <Typography color={emailSent ? "success.main" : "error"} fontWeight="500">
                  {message}
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleForgotPasswordSubmit}
                sx={{ py: 2 }}
              >
                Send Reset Link
              </Button>

              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  setForgotPassword(false);
                  setMessage("");
                  setEmail("");
                  setEmailSent(false);
                }}
                sx={{ alignSelf: "center" }}
              >
                Back to Login
              </Link>
            </>
          )}
        </Stack>
      </Box>
    </CenteredContainer>
  );
}
