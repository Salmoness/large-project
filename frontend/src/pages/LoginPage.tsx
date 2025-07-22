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
        navigate("/host_dashboard");
      }
    } catch {
      setMessage("Service unavailable. Try again later!");
    }
  }

  async function handleForgotPasswordSubmit() {
    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    try {
      const response = await fetch(getAPIBaseURL() + "users/request-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const res = await response.json();
      if (res.error) setMessage(res.error);

      setEmailSent(true);
      setMessage("If an account exists with that email, a reset link was sent.");
    } catch {
      setMessage("Service unavailable. Try again later.");
    }
  }

  return (
    <CenteredContainer>
      <ProjectHeader />
      <Box width="100%" maxWidth={400} mx="auto" px={2}>
        <Stack spacing={3}>
          {!forgotPassword ? (
            <>
              <TextField
                label="Username"
                variant="outlined"
                placeholder="Username"
                fullWidth
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
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
                <Typography color="error" fontWeight={500} textAlign="center">
                  {message}
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={doLogin}
                sx={{ py: 1.75, fontWeight: 600 }}
              >
                Login
              </Button>

              <Link
                component="button"
                variant="body2"
                onClick={() => setForgotPassword(true)}
                sx={{ alignSelf: "center", cursor: "pointer" }}
              >
                Forgot password?
              </Link>

              <Typography align="center" color="text.secondary">
                Don't have an account?
              </Typography>

              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => navigate("/register")}
                sx={{ py: 1.75, fontWeight: 600 }}
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
                autoFocus
              />

              {message && (
                <Typography
                  color={emailSent ? "success.main" : "error"}
                  fontWeight={500}
                  textAlign="center"
                >
                  {message}
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleForgotPasswordSubmit}
                sx={{ py: 1.75, fontWeight: 600 }}
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
                sx={{ alignSelf: "center", cursor: "pointer" }}
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
