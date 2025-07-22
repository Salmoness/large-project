import { useLocation, useNavigate } from "react-router-dom"
import { hostQuiz } from "../components/hostQuiz"
import {
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
} from "@mui/material"
import BroadcastOnPersonalIcon from "@mui/icons-material/BroadcastOnPersonal"

export default function PreviewPage() {
  const location = useLocation()
  const navigate = useNavigate()

  const { questions, summary, quizID, title } = location.state || {}

  if (!questions || !summary) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h6" color="error">
          No quiz data provided.
        </Typography>
      </Box>
    )
  }

  const handleHost = () => {
    hostQuiz(quizID)
      .then((accessCode) => {
        navigate("/host", {
          state: { questions, accessCode, summary, quizID },
        })
      })
      .catch(() => {
        alert("Failed to host the quiz. Please try again.")
      })
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <Box sx={{ px: 4, py: 6, maxWidth: 700, mx: "auto", pb: 12 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        {title || "Quiz Preview"}
      </Typography>

      <Typography variant="subtitle1" gutterBottom color="text.secondary">
        {summary}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <List>
        {questions.map((q: any, i: number) => (
          <ListItem
            key={i}
            alignItems="flex-start"
            sx={{
              mb: 2,
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            <Typography variant="body1" fontWeight="bold" mb={1}>
              {`Q${i + 1}: ${q.question}`}
            </Typography>

            <List disablePadding>
              {q.options.map((opt: string, idx: number) => (
                <ListItem
                  key={`${i}-${idx}`}
                  divider
                  dense
                  sx={{ color: "text.secondary", pl: 3 }}
                >
                  <Typography>{opt}</Typography>
                </ListItem>
              ))}
            </List>
          </ListItem>
        ))}
      </List>

     
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          py: 2,
          px: 4,
          backgroundColor: "rgba(24, 113, 172, 0.1)",
          borderTop: "1px solid #ccc",
          display: "flex",
          justifyContent: "center",
          gap: 2,
          zIndex: 1000,
          backdropFilter: "blur(6px)",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleBack}>
          Back
        </Button>

        <Button
          variant="contained"
          color="success"
          startIcon={<BroadcastOnPersonalIcon />}
          onClick={handleHost}
        >
          Host Quiz
        </Button>
      </Box>
    </Box>
  )
}
