import { Navigate, createBrowserRouter } from 'react-router-dom';

import { Dashboard, Secure, Signin, Signup } from './pages';
import { AuthGuard } from './guards';
import { EPublicRoutes, ESecureRoutes } from './models';
import { Layout, FeedBackLayout } from './ui';

const Router = createBrowserRouter([
  {
    element: <FeedBackLayout />,
    children: [
      { path: EPublicRoutes.SIGNIN, element: <Signin /> },
      { path: EPublicRoutes.SIGNUP, element: <Signup /> },
      { path: EPublicRoutes.SECURE, element: <Secure /> },
      { path: '/', element: <Navigate replace to={EPublicRoutes.SECURE} /> },
      { path: '/*', element: <p>{'404 not found'}</p> },
      {
        element: <AuthGuard />,
        children: [
          {
            element: <Layout />,
            children: [
              { path: ESecureRoutes.DASHBOARD, element: <Dashboard /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default Router;
