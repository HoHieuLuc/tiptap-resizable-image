import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './not-found.module.css';
import Link from 'next/link';
import { SITE_TITLE } from '@/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `404 | ${SITE_TITLE}`,
};

const NotFound = () => {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text c='dimmed' size='lg' ta='center' className={classes.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>
      <Group justify='center'>
        <Button component={Link} href='/' variant='subtle' size='md'>
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
};
export default NotFound;
