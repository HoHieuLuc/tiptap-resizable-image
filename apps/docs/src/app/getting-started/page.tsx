import { Stack, Text, Title } from '@mantine/core';
import GettingStartedExample from './GettingStartedExample';
import CodeHighlightTabs from '@/components/CodeHighlightTabs/CodeHighlightTabs';
import readFile from '@/utils/read-file';

const Page = async () => {
  const componentFile = await readFile({
    path: '/app/getting-started/GettingStartedExample.tsx',
  });
  const componentCode = componentFile
    .replaceAll('GettingStartedExample', 'Demo')
    .replace('@/styles/editor', './Demo');
  const cssCode = await readFile({
    path: '/styles/editor.css',
  });

  return (
    <Stack>
      <Title>Getting started</Title>
      <CodeHighlightTabs
        code={['npm', 'yarn', 'pnpm'].map((item) => ({
          code: `${item} install tiptap-resizable-image`,
          fileName: item,
          language: 'bash',
        }))}
        withExpandButton={false}
      />
      <Text>Basic usage:</Text>
      <CodeHighlightTabs
        code={[
          { fileName: 'Demo.tsx', code: componentCode, language: 'tsx' },
          { fileName: 'Demo.css', code: cssCode, language: 'css' },
        ]}
      />
      <GettingStartedExample />
    </Stack>
  );
};

export default Page;
