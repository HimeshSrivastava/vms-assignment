import { Card, CardContent, Typography } from '@mui/material';

export default function StreamCard({ streamId, data }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1a237e" }} gutterBottom>
          Stream ID: {streamId}
        </Typography>
        <Typography variant="body2">Frame #: {data.frame_number}</Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold", color: "black" }}>Brightness: {data.brightness?.average_brightness?.toFixed(2)}</Typography>
        <Typography variant="body2" sx={{ color: data.brightness?.low_light ? "orange" : "green" }}>Low Light: {data.brightness?.low_light}</Typography>
        <Typography variant="body2"  sx={{ color: data.red_alert?.red_alert ? "red" : "green", fontWeight: "bold" }}>Red Alert: {data.red_alert?.red_alert ? "🚨 Yes" : "✅ No"}</Typography>
        <Typography variant="body2">Red Pixel Ratio: {data.red_alert?.red_pixel_ratio?.toFixed(4)}</Typography>
        <Typography variant="caption">Timestamp: {data.timestamp}</Typography>
      </CardContent>
    </Card>
  );
}
