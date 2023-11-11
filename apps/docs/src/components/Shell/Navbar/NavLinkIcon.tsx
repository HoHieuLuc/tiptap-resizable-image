import { ThemeIconProps, ThemeIcon } from '@mantine/core';
import classes from './NavLinkIcon.module.css';

const NavLinkIcon = (props: ThemeIconProps) => {
  return (
    <ThemeIcon className={classes.root} radius='xl' {...props}>
      {props.children}
    </ThemeIcon>
  );
};

export default NavLinkIcon;
