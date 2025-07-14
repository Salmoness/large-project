import "./assets/custom.css";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.ts";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import CardPage from "./pages/CardsPage.tsx";
import IndexPage from "./pages/IndexPage.tsx";
import PlayPage from "./pages/PlayPage.tsx";
import ConfirmEmailByTokenPage from "./pages/account/ConfirmEmailByTokenPage.tsx";
import ConfirmEmailTokenSentPage from "./pages/account/ConfirmEmailTokenSentPage.tsx";
import HostPage from "./pages/HostPage.tsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/play" element={<PlayPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cards" element={<CardPage />} />
          <Route path="/host" element={<HostPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/account/registration-email-sent"
            element={<ConfirmEmailTokenSentPage />}
          />
          <Route
            path="/account/registration-email-confirmation/:token"
            element={<ConfirmEmailByTokenPage />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;
