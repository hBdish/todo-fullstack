import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import { StoreContext } from '@services';
import { rootStore } from './services/root-store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={rootStore}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
);
