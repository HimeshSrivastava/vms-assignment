import { Box, List, Typography, Paper } from '@mui/material'
import { useState, useEffect } from 'react'
import AlertItem from './AlertItem'

export default function AlertPanel() {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    const fetchAlerts = async () => {
  try {
    const streamRes = await fetch('http://localhost:8000/streams');
    const streamData = await streamRes.json();
    
    const newAlerts = [];

    for (const [id, info] of Object.entries(streamData)) {
      const resultRes = await fetch(`http://localhost:8000/results/${id}`);
      if (!resultRes.ok) continue;

      const result = await resultRes.json();
      const lowLight = result.brightness?.low_light === "True";
      const redAlert = result.red_alert?.red_alert === "True";

      if (lowLight || redAlert) {
        newAlerts.push({
          id,
          type: lowLight ? 'Low Light' : 'Red Alert',
          timestamp: result.timestamp || new Date().toISOString()
        });
      }
    }

    setAlerts(newAlerts);
  } catch (error) {
    console.error("Error fetching alerts:", error);
  }
};


    fetchAlerts()
    const interval = setInterval(fetchAlerts, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Alerts</Typography>
      <Paper sx={{ maxHeight: 400, overflow: 'auto' }}>
        <List>
          {alerts.map((alert) => (
            <AlertItem key={`${alert.id}-${alert.timestamp}`} alert={alert} />
          ))}
        </List>
      </Paper>
    </Box>
  )
}