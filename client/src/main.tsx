import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Store } from '@redux';
import { Loader } from '@ui';

import Router from './router';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <React.Suspense fallback={<Loader />}>
      <Provider store={Store}>
        <RouterProvider router={Router} />
      </Provider>
    </React.Suspense>
  </React.StrictMode>
);
