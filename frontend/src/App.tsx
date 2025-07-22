// App.tsx
import "./assets/custom.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import IndexPage from "./pages/IndexPage";
import PlayPage from "./pages/PlayPage";
import ConfirmEmailByTokenPage from "./pages/account/ConfirmEmailByTokenPage";
import ConfirmEmailTokenSentPage from "./pages/account/ConfirmEmailTokenSentPage";
import ResetPasswordByTokenPage from "./pages/account/ResetPasswordByTokenPage";
import HostDashboardPage from "./pages/HostDashboardPage";
import PlaygroundPage from "./pages/PlaygroundPage";
import CreatePage from "./pages/CreatePage";
import BrowsePage from "./pages/BrowsePage";
import QuizPreviewPage from "./pages/QuizPreviewPage";
import GenerationSuccessPage from "./pages/GenerationSuccessPage";
import HostQuizPage from "./pages/HostQuizPage";
import HistoryPage from "./pages/HistoryPage";
import LeaderboardPage from "./pages/LeaderboardPage";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/play" element={<PlayPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/host_dashboard" element={<HostDashboardPage />} />
          <Route path="/host" element={<HostQuizPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/preview" element={<QuizPreviewPage />} />
          <Route path="/generation_success" element={<GenerationSuccessPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />

          <Route
            path="/account/registration-email-sent"
            element={<ConfirmEmailTokenSentPage />}
          />
          <Route
            path="/account/registration-email-confirmation/:token"
            element={<ConfirmEmailByTokenPage />}
          />
          <Route
            path="/account/reset-password/:token"
            element={<ResetPasswordByTokenPage />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
