import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import App from './App';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.scss';
import { ConfigProvider } from 'antd';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={{ token: { colorPrimary: '#1e848d' } }}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
