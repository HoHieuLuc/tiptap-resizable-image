import { NavLink as MNavLink } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavLinkIcon from './NavLinkIcon';
import classes from './NavLink.module.css';
import { Route } from '@/config';

const NavLink = ({ href, label, icon, iconProps, subLinks }: Route) => {
  const pathname = usePathname();
  const opened = subLinks?.some((link) => link.href === pathname);
  const Icon = icon;

  const sharedProps = {
    label,
    leftSection: Icon && (
      <NavLinkIcon {...iconProps}>
        <Icon />
      </NavLinkIcon>
    ),
  };

  if (!subLinks || subLinks.length === 0) {
    return (
      <MNavLink
        {...sharedProps}
        component={Link}
        href={href}
        active={href === pathname}
        target={href.startsWith('/') ? undefined : '_blank'}
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
