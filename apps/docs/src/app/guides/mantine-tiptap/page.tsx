import { Anchor, Stack, Text } from '@mantine/core';
import { CodeHighlightTabs, Heading } from '@/components';
import MantineTiptapExample from './MantineTiptapExample';
import readFile from '@/utils/read-file';
import { SITE_TITLE } from '@/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Mantine Tiptap | ${SITE_TITLE}`,
};

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
      <Heading label='Usage with Mantine Tiptap' />
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
