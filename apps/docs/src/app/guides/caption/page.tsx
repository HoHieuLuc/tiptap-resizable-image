import { CodeHighlightTabs, Heading } from '@/components';
import { SITE_TITLE } from '@/config';
import { Code, Stack, Text } from '@mantine/core';
import { Metadata } from 'next';
import CaptionExample from './CaptionExample';
import readFile from '@/utils/read-file';
import CaptionPropsExample from './CaptionPropsExample';

export const metadata: Metadata = {
  title: `Image caption | ${SITE_TITLE}`,
};

const Page = async () => {
  const captionExampleCode = await readFile({
    path: '/app/guides/caption/CaptionExample.tsx',
    replaces: [['CaptionExample', 'Demo']],
  });

  const captionPropsExampleCode = await readFile({
    path: '/app/guides/caption/CaptionPropsExample.tsx',
    replaces: [['CaptionPropsExample', 'Demo']],
  });

  return (
    <Stack>
      <Heading label='Image caption' />
      <Heading order={2} label='Add image caption'></Heading>
      <Text>
        You can add caption to the image by setting <Code>withCaption</Code> to
        true.
      </Text>
      <CodeHighlightTabs
        code={{
          fileName: 'Demo.tsx',
          code: captionExampleCode,
          language: 'tsx',
        }}
      />
      <CaptionExample />
      <Heading order={2} label='Caption props' />
      <Text>
        You can customize the caption by passing <Code>captionProps</Code> to
        the extension options.
      </Text>
      <CodeHighlightTabs
        code={{
          fileName: 'Demo.tsx',
          code: captionPropsExampleCode,
          language: 'tsx',
        }}
      />
      <CaptionPropsExample />
    </Stack>
  );
};

export default Page;
