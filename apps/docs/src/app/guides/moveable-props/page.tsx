import { Anchor, Code, Stack, Text, Title } from '@mantine/core';
import MoveablePropsExample from './MoveablePropsExample';
import readFile from '@/utils/read-file';
import CodeHighlightTabs from '@/components/CodeHighlightTabs/CodeHighlightTabs';
import { SITE_TITLE } from '@/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Moveable props | ${SITE_TITLE}`,
};

const Page = async () => {
  const code = await readFile({
    path: '/app/guides/moveable-props/MoveablePropsExample.tsx',
    replaces: [['MoveablePropsExample', 'Demo']],
  });

  return (
    <Stack>
      <Title>Override Moveable props</Title>
      <Text>
        This extension uses{' '}
        <Anchor href='https://www.npmjs.com/package/moveable' target='_blank'>
          moveable
        </Anchor>{' '}
        under the hood to manage resizing. The default properties can be overridden by
        passing <Code>moveableProps</Code> object to the extension options.
      </Text>
      <CodeHighlightTabs code={{ fileName: 'Demo.tsx', code, language: 'tsx' }} />
      <MoveablePropsExample />
    </Stack>
  );
};
export default Page;
