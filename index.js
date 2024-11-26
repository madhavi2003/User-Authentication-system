

import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import { UserProvider } from './UserContext';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root

root.render(
  <UserProvider>
    <App />
  </UserProvider>
);