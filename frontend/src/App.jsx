import { Container, CssBaseline } from '@mui/material'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Dashboard />
      </Container>
    </>
  )
}

export default App