import React from 'react';
import ReactDOM from 'react-dom/client';
import { PositionContextProvider } from './store/positionContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PositionContextProvider>
      <App />
    </PositionContextProvider>
  </React.StrictMode>
);
