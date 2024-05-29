import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import { StoreContext } from '@services';
import { rootStore } from './services/root-store.ts';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StoreContext.Provider value={rootStore}>
        <App />
      </StoreContext.Provider>
    </LocalizationProvider>
  </React.StrictMode>,
);
