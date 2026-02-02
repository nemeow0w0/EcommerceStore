import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App'; // เปลี่ยนจาก AppRoutes เป็น App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
