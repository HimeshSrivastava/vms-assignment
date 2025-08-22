import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function StreamCard({ streamId, data }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          background:
            data.red_alert?.red_alert
              ? "linear-gradient(135deg, #ffebee, #ffcdd2)"
              : "linear-gradient(135deg, #f0f4ff, #ffffff)",
          border: data.red_alert?.red_alert ? "2px solid #f44336" : "1px solid #ddd",
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1a237e" }}>
            Stream ID: {streamId}
          </Typography>

          <Typography variant="body2">Frame #: {data.frame_number}</Typography>

          <Typography variant="body2">
            Brightness:{" "}
            <motion.span
              key={data.brightness?.average_brightness}
              initial={{ backgroundColor: "#ffff99" }}
              animate={{ backgroundColor: "transparent" }}
              transition={{ duration: 1 }}
            >
              {data.brightness?.average_brightness?.toFixed(2)}
            </motion.span>
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: data.brightness?.low_light ? "orange" : "green" }}
          >
            Low Light: {data.brightness?.low_light ? "Yes" : "No"}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: data.red_alert?.red_alert ? "red" : "green", fontWeight: "bold" }}
          >
            Red Alert: {data.red_alert?.red_alert ? "🚨 Yes" : "✅ No"}
          </Typography>

          <Typography variant="body2">
            Red Pixel Ratio: {data.red_alert?.red_pixel_ratio?.toFixed(4)}
          </Typography>

          <Typography variant="caption" sx={{ color: "gray" }}>
            Timestamp: {data.timestamp}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
