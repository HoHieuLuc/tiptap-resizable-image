import { Anchor, Stack, Text } from '@mantine/core';
import { CodeHighlightTabs, Heading } from '@/components';
import ContextMenuExample from './ContextMenuExample';
import readFile from '@/utils/read-file';
import { SITE_TITLE } from '@/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Context menu | ${SITE_TITLE}`,
};

const Page = async () => {
  const code = await readFile({
    path: '/app/guides/context-menu/ContextMenuExample.tsx',
    replaces: [['ContextMenuExample', 'Demo']],
  });

  return (
    <Stack>
      <Heading label='Context menu' />
      <Text>
        This example uses{' '}
        <Anchor
          href='https://www.npmjs.com/package/mantine-contextmenu'
          target='_blank'
        >
          mantine-contextmenu
        </Anchor>
        {', '}
        but you can also implement your own context menu component.
      </Text>
      <CodeHighlightTabs
        code={[{ fileName: 'Demo.tsx', code, language: 'tsx' }]}
      />
      <ContextMenuExample />
    </Stack>
  );
};
export default Page;
