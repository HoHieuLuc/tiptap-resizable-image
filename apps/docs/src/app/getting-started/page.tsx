import { Stack, Text, Title } from '@mantine/core';
import GettingStartedExample from './GettingStartedExample';
import CodeHighlightTabs from '@/components/CodeHighlightTabs/CodeHighlightTabs';
import readFile from '@/utils/read-file';
import { CodeHighlight } from '@mantine/code-highlight';
import { Metadata } from 'next';
import { SITE_TITLE } from '@/config';

export const metadata: Metadata = {
  title: `Getting started | ${SITE_TITLE}`,
};

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
      <Title order={2}>Installation</Title>
      <CodeHighlightTabs
        code={[
          {
            code: 'npm install tiptap-resizable-image',
            fileName: 'npm',
            language: 'bash',
          },
          {
            code: 'yarn add tiptap-resizable-image',
            fileName: 'yarn',
            language: 'bash',
          },
          {
            code: 'pnpm install tiptap-resizable-image',
            fileName: 'pnpm',
            language: 'bash',
          },
        ]}
        withExpandButton={false}
      />
      <Text>
        Don&lsquo;t forget to import the CSS file to your application:
      </Text>
      <CodeHighlight
        code={`import 'tiptap-resizable-image/styles.css';`}
        language='tsx'
      />
      <Title order={2}>Basic usage:</Title>
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
