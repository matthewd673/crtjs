import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SettingsProvider } from './contexts/SettingsContext';
import QueryString from 'qs';

const root = ReactDOM.createRoot(document.getElementById('root'));

const query = QueryString.parse(window.location.href.split('?')[1]);
console.log(query);

root.render(
  <React.StrictMode>
    <SettingsProvider>
      <App shareCode={query.share}/>
    </SettingsProvider>
  </React.StrictMode>
);