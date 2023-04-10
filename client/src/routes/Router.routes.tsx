import { createBrowserRouter } from 'react-router-dom';

import { Routes } from '../models';
import { Dashboard } from '../pages';

const Router = createBrowserRouter([
  { path: Routes.DASHBOARD, element: <Dashboard /> },
]);

export default Router;
