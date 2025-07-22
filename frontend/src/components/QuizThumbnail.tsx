import { Card, CardContent, Typography, Box } from "@mui/material";

type QuizThumbnailProps = {
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
};

export default function QuizThumbnail({
  title,
  description,
  createdBy,
  createdAt,
}: QuizThumbnailProps) {
  return (
    <Card
      sx={{
        width: 260,
        minHeight: 180,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 3,
        borderRadius: 3,
        boxShadow: 6,
        bgcolor: "background.paper",
        cursor: "pointer",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 12,
        },
      }}
      elevation={3}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom color="primary">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1.5 }}
        >
          {description || "No description"}
        </Typography>
      </CardContent>

      <Box mt={1}>
        <Typography variant="subtitle2" color="secondary.main">
          Created by: {createdBy}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Date: {createdAt}
        </Typography>
      </Box>
    </Card>
  );
}
