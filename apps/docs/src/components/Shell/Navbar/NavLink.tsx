import { NavLink as MNavLink } from '@mantine/core';
import { NavbarLink } from './Navbar.data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavLinkIcon from './NavLinkIcon';
import classes from './NavLink.module.css';

const NavLink = ({ href, label, icon, iconProps, subLinks }: NavbarLink) => {
  const pathname = usePathname();
  const opened = subLinks?.some((link) => link.href === pathname);

  const sharedProps = {
    label,
    leftSection: <NavLinkIcon {...iconProps}>{icon}</NavLinkIcon>,
  };

  if (!subLinks || subLinks.length === 0) {
    return (
      <MNavLink
        {...sharedProps}
        component={Link}
        href={href}
        active={href === pathname}
      />
    );
  }

  return (
    <MNavLink
      {...sharedProps}
      classNames={{
        children: classes.children,
      }}
      defaultOpened={opened}
    >
      {subLinks.map((link) => (
        <MNavLink
          key={link.href}
          leftSection={link.icon}
          label={link.label}
          component={Link}
          href={link.href}
          active={link.href === pathname}
        />
      ))}
    </MNavLink>
  );
};
export default NavLink;
