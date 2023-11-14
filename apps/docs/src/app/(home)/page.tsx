import {
  Button,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import Link from 'next/link';
import classes from './page.module.css';
import { IconBrandGithub, IconFlame, IconLifebuoy, IconScale } from '@tabler/icons-react';
import Jumbotron from './Jumbotron';
import { REPO_LINK } from '@/config';

const Home = () => {
  return (
    <Stack>
      <Title className={classes.title}>
        Tiptap{' '}
        <Text
          component='span'
          variant='gradient'
          gradient={{ from: 'blue', to: 'cyan' }}
          inherit
        >
          Resizable Image
        </Text>{' '}
        - Enriching your rich text editor with advanced image control
      </Title>
      <div className={classes.jumbotrons}>
        <Jumbotron
          icon={<IconScale />}
          title='Free and open source'
          description='This package is released under the MIT license, you can use titap-extension-resizable-image in any project'
        />
        <Jumbotron
          icon={<IconLifebuoy />}
          title='TypeScript based'
          description='Built with TypeScript, ensuring a smooth and type-safe development experience'
        />
        <Jumbotron
          icon={<IconFlame />}
          title='Flexible'
          description='Offers flexibility with customizable styles, interactive context menus and popovers, adapting to your unique development needs'
        />
      </div>
      <Group justify='center'>
        <Button
          component={Link}
          href='/getting-started'
          variant='gradient'
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          size='xl'
          radius='md'
        >
          Get Started
        </Button>
        <Button
          component='a'
          href={REPO_LINK}
          target='_blank'
          leftSection={<IconBrandGithub />}
          variant='default'
          size='xl'
          radius='md'
        >
          GitHub
        </Button>
      </Group>
    </Stack>
  );
};
export default Home;
