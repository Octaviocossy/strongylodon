import { createBrowserRouter } from 'react-router-dom';

import { ERoutes } from './models';
import { Signin, Signup } from './pages';

const Router = createBrowserRouter([
  { path: ERoutes.SIGNIN, element: <Signin /> },
  { path: ERoutes.SIGNUP, element: <Signup /> },
]);

export default Router;
