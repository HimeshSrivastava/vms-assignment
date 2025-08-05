// components/AlertItem.jsx
import { ListItem, ListItemText } from '@mui/material'

export default function AlertItem({ alert }) {
  return (
    <ListItem>
      <ListItemText
        primary={`${alert.type} detected`}
        secondary={`Stream ID: ${alert.id} at ${new Date(alert.timestamp).toLocaleTimeString()}`}
      />
    </ListItem>
  )
}
