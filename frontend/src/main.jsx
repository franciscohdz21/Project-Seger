import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';                 //  <- only import App!
import './index.css';                    //  Tailwind / global styles
import 'react-datepicker/dist/react-datepicker.css';   // if you use react-datepicker

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
