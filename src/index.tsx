import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import { Routers } from './routes/routes';
import 'antd/dist/antd'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Routers/>
  </React.StrictMode>
);

