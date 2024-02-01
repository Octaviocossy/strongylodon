import { Outlet } from 'react-router-dom';
import { Container, Navbar } from '@ui';

const Layout = () => {
  return (
    <Container>
      <Navbar />
      <div className="mt-[5rem]">
        <Outlet />
      </div>
    </Container>
  );
};

export default Layout;
