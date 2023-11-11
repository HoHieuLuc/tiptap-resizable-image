import { Anchor, Stack, Text, Title } from '@mantine/core';
import ContextMenuExample from './ContextMenuExample';
import readFile from '@/utils/read-file';
import CodeHighlightTabs from '@/components/CodeHighlightTabs/CodeHighlightTabs';

const Page = async () => {
  const code = await readFile({
    path: '/app/guides/context-menu/ContextMenuExample.tsx',
  });

  return (
    <Stack>
      <Title>Context menu</Title>
      <Text>
        This example use{' '}
        <Anchor
          href='https://icflorescu.github.io/mantine-contextmenu/'
          target='_blank'
        >
          mantine-contextmenu
        </Anchor>
      </Text>
      <ContextMenuExample />
      <CodeHighlightTabs
        code={[{ fileName: 'Demo.tsx', code, language: 'tsx' }]}
      />
    </Stack>
  );
};
export default Page;
