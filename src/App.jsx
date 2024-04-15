import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from '@/routers/AppRouter';

const App = createRoot(document.getElementById('root'));
App.render(
  // <StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  // </StrictMode>
);