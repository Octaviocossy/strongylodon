import { useLocation } from 'react-router-dom';

import { ESecureRoutes } from '../../models';
import { Logo } from '../../assets';
import { Container, Link } from '..';

import { Avatar } from '.';

const links: { to: string; text: string }[] = [
  {
    text: 'Super buy',
    to: ESecureRoutes.SUPERBUY,
  },
  {
    text: 'Dashboard',
    to: ESecureRoutes.DASHBOARD,
  },
];

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <Container className="py-[1rem] flex absolute w-full top-0 left-0 right-0">
      <section className="flex-1">
        <img className="h-12 w-12 drop-shadow-xl" src={Logo} />
      </section>
      <section className="flex space-x-6 items-center">
        {links.map((_link) => (
          <Link
            key={_link.to}
            text={_link.text}
            to={_link.to}
            underline={pathname === _link.to}
          />
        ))}
        <Avatar />
      </section>
    </Container>
  );
};

export default Navbar;
