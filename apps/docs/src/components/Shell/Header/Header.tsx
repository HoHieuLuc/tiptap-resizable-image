import {
  Group,
  Burger,
  ActionIcon,
  Text,
  useMantineColorScheme,
  useComputedColorScheme,
  ThemeIcon,
  Tooltip,
} from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandNpm,
  IconMoon,
  IconResize,
  IconSun,
} from '@tabler/icons-react';
import classes from './Header.module.css';
import { NPM_LINK, REPO_LINK } from '@/config';
import Link from 'next/link';

interface Props {
  navbarOpened: boolean;
  onNavbarToggle(): void;
}

const Header = ({ navbarOpened, onNavbarToggle }: Props) => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  return (
    <Group justify='space-between' className={classes.root}>
      <Group>
        <Burger
          opened={navbarOpened}
          onClick={onNavbarToggle}
          hiddenFrom='sm'
          size='sm'
        />
        <Link href='/' className={classes['brand-link']}>
          <ThemeIcon color='gray' visibleFrom='sm'>
            <IconResize />
          </ThemeIcon>
          <Text className={classes['brand-title']}>Tiptap Resizable Image</Text>
        </Link>
      </Group>
      <Group gap='xs'>
        <Tooltip label='npm'>
          <ActionIcon
            component='a'
            href={NPM_LINK}
            target='_blank'
            variant='default'
            size='lg'
            className={classes['link-action-icon']}
          >
            <IconBrandNpm />
          </ActionIcon>
        </Tooltip>
        <Tooltip label='Source code'>
          <ActionIcon
            component='a'
            href={REPO_LINK}
            target='_blank'
            variant='default'
            size='lg'
            className={classes['link-action-icon']}
          >
            <IconBrandGithub />
          </ActionIcon>
        </Tooltip>
        <Tooltip label='Toggle color scheme'>
          <ActionIcon
            variant='default'
            size='lg'
            onClick={() =>
              setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
            }
          >
            <IconSun className={classes['icon-sun']} />
            <IconMoon className={classes['icon-moon']} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Group>
  );
};
export default Header;
