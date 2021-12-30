import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css'; 
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'; 

axios.defaults.baseURL = "http://127.0.0.1:5000"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
