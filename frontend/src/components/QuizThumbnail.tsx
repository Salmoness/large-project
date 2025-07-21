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
        width: 250,
        height: 180,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        borderRadius: "16px",
        boxShadow: 3,
        backgroundColor: "#f9f9f9",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {description}
        </Typography>
        <Box>
        </Box>
      </CardContent>

      <Box mt={1}>
        <Typography variant="subtitle2" color="primary">
          Created by: {createdBy}
        </Typography>
        <Typography variant="caption" color="text.secondary">
            Date: {createdAt}
          </Typography>
      </Box>
    </Card>
  );
}
