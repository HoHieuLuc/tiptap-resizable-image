import { Stack, Text } from '@mantine/core';
import { CodeHighlightTabs, Heading } from '@/components';
import PastingAndDroppingExample from './PastingAndDroppingExample';
import readFile from '@/utils/read-file';
import { SITE_TITLE } from '@/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Pasting and dropping | ${SITE_TITLE}`,
};

const Page = async () => {
  const code = await readFile({
    path: '/app/guides/pasting-and-dropping/PastingAndDroppingExample.tsx',
    replaces: [['PastingAndDroppingExample', 'Demo']],
  });

  return (
    <Stack>
      <Heading label='Pasting and dropping' />
      <Text>
        When pasting or dropping an image from the file system, an upload
        handler can be added as follows:
      </Text>
      <CodeHighlightTabs
        code={{ fileName: 'Demo.tsx', code, language: 'tsx' }}
      />
      <PastingAndDroppingExample />
    </Stack>
  );
};
export default Page;
