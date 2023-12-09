import { Stack } from '@mantine/core';
import { Heading } from '@/components';
import ResizeHandlerStyle from './ResizeHandlerStyle';
import GhostStyle from './GhostStyle';
import { SITE_TITLE } from '@/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Styling | ${SITE_TITLE}`,
};

const Page = () => {
  return (
    <Stack>
      <Heading label='Styling' />
      <ResizeHandlerStyle />
      <GhostStyle />
    </Stack>
  );
};

export default Page;
