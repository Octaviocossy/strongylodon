import { Navigate, createBrowserRouter } from 'react-router-dom';

import { Dashboard, Signin, Signup } from './pages';
import { AuthGuard } from './guards';
import { EPublicRoutes, ESecureRoutes } from './models';
import { Layout } from './ui';

const Router = createBrowserRouter([
  { path: EPublicRoutes.SIGNIN, element: <Signin /> },
  { path: EPublicRoutes.SIGNUP, element: <Signup /> },
  { path: '/', element: <Navigate replace to={ESecureRoutes.DASHBOARD} /> },
  { path: '/*', element: <p>{'404 not found'}</p> },
  {
    element: <AuthGuard />,
    children: [
      {
        element: <Layout />,
        children: [{ path: ESecureRoutes.DASHBOARD, element: <Dashboard /> }],
      },
    ],
  },
]);

export default Router;
