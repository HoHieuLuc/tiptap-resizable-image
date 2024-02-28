import { ROUTES } from '@/config';
import NavLink from './NavLink';

const navLinkElements = ROUTES.map((link) => (
  <NavLink key={link.label} {...link} />
));

const Navbar = () => {
  return <div>{navLinkElements}</div>;
};
export default Navbar;
