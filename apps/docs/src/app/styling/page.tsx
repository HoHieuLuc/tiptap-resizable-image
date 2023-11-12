import {  Stack, Title } from '@mantine/core';
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
      <Title>Styling</Title>
      <ResizeHandlerStyle />
      <GhostStyle />
    </Stack>
  );
};

export default Page;
