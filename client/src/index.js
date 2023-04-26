import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';
import { ModalContextProvider } from './context/modal'
import { UserContextProvider } from './context/user'
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalContextProvider>
      <UserContextProvider>
        <QueryClientProvider client={client}>
          <Router>
            <App />
          </Router>
        </QueryClientProvider>
      </UserContextProvider>
    </ModalContextProvider>
  </React.StrictMode>
);