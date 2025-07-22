import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import ProjectHeader from "../components/ProjectHeader";
import CenteredContainer from "../components/CenteredContainer";


export default function IndexPage() {
  const navigate = useNavigate();

  return (
    
    <CenteredContainer>
      <ProjectHeader />

      <Stack spacing={2} sx={{ mt: 4, width: "60%" }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => navigate("/play")}
          sx={{ py: 2 }}
        >
          Play as Guest
        </Button>

        <Button
          fullWidth
          variant="contained"
          color="success"
          onClick={() => navigate("/login")}
          sx={{ py: 2 }}
        >
          Login
        </Button>

        {/* <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => navigate("/host_dashboard")}
          sx={{ py: 2 }}
        >
          Host
        </Button> */}

        {/* <Button
          fullWidth
          variant="contained"
          color="error"
          onClick={() => navigate("/playground")}
          sx={{ py: 2 }}
        >
          Playground
        </Button> */}

      </Stack>
    </CenteredContainer>
  );
}
