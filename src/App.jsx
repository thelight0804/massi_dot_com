import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from '@/routers/AppRouter';
import store from '@/redux/store/store';
import { Provider } from 'react-redux';

const App = createRoot(document.getElementById('root'));
App.render(
  // <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  // </StrictMode>
);