import { Anchor, Stack, Text, Title } from '@mantine/core';
import ContextMenuExample from './ContextMenuExample';
import readFile from '@/utils/read-file';
import CodeHighlightTabs from '@/components/CodeHighlightTabs/CodeHighlightTabs';

const Page = async () => {
  const code = await readFile({
    path: '/app/guides/context-menu/ContextMenuExample.tsx',
    replaces: [['ContextMenuExample', 'Demo']],
  });

  return (
    <Stack>
      <Title>Context menu</Title>
      <Text>
        This example uses{' '}
        <Anchor
          href='https://www.npmjs.com/package/mantine-contextmenu'
          target='_blank'
        >
          mantine-contextmenu
        </Anchor>
        {', '}
        you can also implement your own context menu component.
      </Text>
      <CodeHighlightTabs
        code={[{ fileName: 'Demo.tsx', code, language: 'tsx' }]}
      />
      <ContextMenuExample />
    </Stack>
  );
};
export default Page;
