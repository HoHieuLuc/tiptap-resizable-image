import { Anchor, Code, Stack, Text } from '@mantine/core';
import { CodeHighlightTabs, Heading } from '@/components';
import MoveablePropsExample from './MoveablePropsExample';
import readFile from '@/utils/read-file';
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
      <Heading label='Override Moveable props' />
      <Text>
        This extension uses{' '}
        <Anchor href='https://www.npmjs.com/package/moveable' target='_blank'>
          moveable
        </Anchor>{' '}
        under the hood to manage resizing. The default properties can be
        overridden by passing <Code>moveableProps</Code> object to the extension
        options.
      </Text>
      <CodeHighlightTabs
        code={{ fileName: 'Demo.tsx', code, language: 'tsx' }}
      />
      <MoveablePropsExample />
    </Stack>
  );
};
export default Page;
