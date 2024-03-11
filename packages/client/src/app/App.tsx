import { Button, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes } from 'react-router-dom';
import { theme } from './styles/theme/theme.ts';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Button variant="contained">Primary</Button>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
