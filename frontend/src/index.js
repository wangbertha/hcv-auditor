import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import ListContextProvider from './Context/ListContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ListContextProvider>
    <App />
  </ListContextProvider>
);
