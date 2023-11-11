import { Button, Title } from '@mantine/core';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <Title>Tiptap Resizable Image extension</Title>
      <Button component={Link} href='/getting-started' size='xl' radius='md'>
        Get Started
      </Button>
    </div>
  );
};
export default Home;
