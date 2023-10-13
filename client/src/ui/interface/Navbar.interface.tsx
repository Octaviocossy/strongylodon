import { ESecureRoutes } from '../../models';
import { Logo } from '../../assets';
import { Container, Link } from '..';

import { Avatar } from '.';

const Navbar = () => {
  return (
    <Container className="py-[1rem] flex absolute w-full top-0 left-0 right-0">
      <section className="flex-1">
        <img className="h-12 w-12 drop-shadow-xl" src={Logo} />
      </section>
      <section className="flex space-x-6 items-center">
        <Link text={'Super buy'} to={ESecureRoutes.SUPERBUY} underline={true} />
        <Link
          text={'Dashboard'}
          to={ESecureRoutes.DASHBOARD}
          underline={true}
        />
        <Avatar />
      </section>
    </Container>
  );
};

export default Navbar;
