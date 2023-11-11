import {
  Group,
  Burger,
  ActionIcon,
  Text,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import classes from './Header.module.css';

interface Props {
  navbarOpened: boolean;
  onNavbarToggle(): void;
}

const Header = ({ navbarOpened, onNavbarToggle }: Props) => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Group h='100%' px='md' justify='space-between'>
      <Group>
        <Burger
          opened={navbarOpened}
          onClick={onNavbarToggle}
          hiddenFrom='sm'
          size='sm'
        />
        <Text>Tiptap Resizable Image</Text>
      </Group>
      <Group>
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
      </Group>
    </Group>
  );
};
export default Header;
