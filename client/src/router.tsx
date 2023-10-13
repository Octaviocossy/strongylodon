import { Navigate, createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import { Secure } from '@pages';
import { AuthGuard } from '@guards';
import { EPublicRoutes, ESecureRoutes } from '@models';
import { Layout, FeedBackLayout } from '@ui';

// Lazy components
const Signin = lazy(() => import('./pages/auth/signin/Signin.page'));
const Signup = lazy(() => import('./pages/auth/signup/Signup.page'));
const Dashboard = lazy(() => import('./pages/secure/dashboard/Dashboard.page'));
const SuperBuy = lazy(() => import('./pages/secure/superbuy/SuperBuy.page'));

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
              { path: ESecureRoutes.SUPERBUY, element: <SuperBuy /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default Router;
