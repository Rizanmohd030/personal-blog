// client/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
// HIGHLIGHT START
// 1. Import the HelmetProvider from the library you installed.
import { HelmetProvider } from 'react-helmet-async';
// HIGHLIGHT END
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* HIGHLIGHT START */}
    {/* 2. Wrap your entire App component with the HelmetProvider.
        This provides the necessary context for all child Helmet components to work correctly. */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
    {/* HIGHLIGHT END */}
  </React.StrictMode>
);