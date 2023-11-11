import { Anchor, Stack, Text, Title } from '@mantine/core';
import MantineTiptapExample from './MantineTiptapExample';
import readFile from '@/utils/read-file';
import CodeHighlightTabs from '@/components/CodeHighlightTabs/CodeHighlightTabs';

const Page = async () => {
  const code = await readFile({
    path: '/app/guides/mantine-tiptap/MantineTiptapExample.tsx',
    replaces: [['MantineTiptapExample', 'Demo']],
  });
  const css = await readFile({
    path: '/app/guides/mantine-tiptap/MantineTiptapExample.module.css',
  });

  return (
    <Stack>
      <Title>Usage with Mantine Tiptap</Title>
      <Text>
        This extension works with{' '}
        <Anchor href='https://mantine.dev/others/tiptap/' target='_blank'>
          Mantine Tiptap
        </Anchor>{' '}
        without any additional configuration. However, you will still need to
        apply some CSS to prevent the image from overflowing during resizing.
      </Text>
      <CodeHighlightTabs
        code={[
          { fileName: 'Demo.tsx', code, language: 'tsx' },
          { fileName: 'Demo.module.css', code: css, language: 'css' },
        ]}
      />
      <MantineTiptapExample />
    </Stack>
  );
};
export default Page;
