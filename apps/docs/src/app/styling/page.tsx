import {  Stack, Title } from '@mantine/core';
import ResizeHandlerStyle from './ResizeHandlerStyle';
import GhostStyle from './GhostStyle';

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
