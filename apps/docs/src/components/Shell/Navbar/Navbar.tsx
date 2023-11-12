import { ROUTES } from '@/config';
import NavLink from './NavLink';

const Navbar = () => {
  return (
    <div>
      {ROUTES.map((link) => (
        <NavLink
          key={link.label}
          {...link}
        />
      ))}
    </div>
  );
};
export default Navbar;
