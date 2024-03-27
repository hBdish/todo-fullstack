import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import { AppRouter } from './routes';

import { theme } from './styles/theme/theme.ts';
import './styles/index.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
