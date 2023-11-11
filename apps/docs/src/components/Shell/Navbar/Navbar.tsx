import NavLink from './NavLink';
import navbarLinks from './Navbar.data';

const Navbar = () => {
  return (
    <div>
      {navbarLinks.map((link) => (
        <NavLink
          key={link.label}
          {...link}
        />
      ))}
    </div>
  );
};
export default Navbar;
