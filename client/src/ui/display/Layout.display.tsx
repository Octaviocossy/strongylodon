import { Outlet } from 'react-router-dom';

import { Container, Navbar } from '.';

const Layout = () => {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
};

export default Layout;
