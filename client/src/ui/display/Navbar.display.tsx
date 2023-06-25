import { ESecureRoutes } from '../../models';
import { Logo } from '../../assets';
import { Link } from '..';

import { Avatar } from '.';

const Navbar = () => {
  return (
    <div className="py-[1rem] flex">
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
    </div>
  );
};

export default Navbar;
