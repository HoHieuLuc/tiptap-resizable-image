import { Anchor, Group } from '@mantine/core';
import classes from './Footer.module.css';
import { LICENSE_LINK, NPM_LINK, REPO_LINK } from '@/config';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Group justify='end' gap='sm'>
        <Anchor href={NPM_LINK} target='_blank' className={classes.link}>
          npm
        </Anchor>
        <Anchor href={REPO_LINK} target='_blank' className={classes.link}>
          Source code
        </Anchor>
        <Anchor href={LICENSE_LINK} target='_blank' className={classes.link}>
          MIT License
        </Anchor>
      </Group>
    </footer>
  );
};
export default Footer;
