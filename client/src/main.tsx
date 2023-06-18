import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';

import Router from './router';
import { Store } from './redux';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={Router} />
    </Provider>
  </React.StrictMode>
);
