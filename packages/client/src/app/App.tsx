import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import { theme } from './styles/theme/theme.ts';
import './styles/index.css';
import { ROUTES } from '@data';
import { AuthPage } from '../pages/auth-page';
import { RegPage } from '../pages/reg-page/reg-page.tsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.Index} />
          <Route path={ROUTES.SignIn} element={<AuthPage />} />
          <Route path={ROUTES.Registration} element={<RegPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
