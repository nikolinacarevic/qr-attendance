import React from 'react';
import ReactDOM from 'react-dom/client';  // Ispravljen import
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Koristi createRoot umjesto render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter> 
    <App />
  </BrowserRouter>
);
