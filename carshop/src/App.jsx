import './App.css'
import Appbar from './components/Appbar';
import CarList from './components/CarList';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

function App() {

  return (
    <>
    <Container maxWidth="xl">
      <CssBaseline />
        <Appbar />
        <CarList />
    </Container>
    </>
  )
}

export default App
