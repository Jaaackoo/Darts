import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './layouts/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Game } from './layouts/Game';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/game' element={<Game />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
