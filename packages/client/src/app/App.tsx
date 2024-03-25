import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { useEffect } from 'react';

import { useStores } from '@services';

import { AppRouter } from './routes';

import { theme } from './styles/theme/theme.ts';
import './styles/index.css';

function App() {
  // const { loginStore } = useStores();

  // useEffect(() => {
  //   void loginStore.refresh();
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
