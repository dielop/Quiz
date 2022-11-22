import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import { config } from "./container/wallet/config";

import Router from './Router';
import reportWebVitals from './reportWebVitals';
import { DAppProvider } from '@usedapp/core';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  
    <React.StrictMode>
      <DAppProvider config = {config}>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
      </DAppProvider>
    </React.StrictMode>
  
);

reportWebVitals();
