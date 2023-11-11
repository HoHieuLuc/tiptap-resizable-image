import { NavLink as MNavLink } from '@mantine/core';
import { NavbarLink } from './Navbar.data';
import Link from 'next/link';

const NavLink = ({ href, label, subLinks }: NavbarLink) => {
  if (!subLinks || subLinks.length === 0) {
    return <MNavLink label={label} component={Link} href={href} />;
  }

  return (
    <MNavLink label={label}>
      {subLinks.map((link) => (
        <MNavLink
          key={link.href}
          label={link.label}
          component={Link}
          href={link.href}
        />
      ))}
    </MNavLink>
  );
};
export default NavLink;
