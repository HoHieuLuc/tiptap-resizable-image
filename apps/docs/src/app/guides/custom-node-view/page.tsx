import { Anchor, Stack, Text } from '@mantine/core';
import { CodeHighlightTabs, Heading } from '@/components';
import SimpleImageExtensionExample from './SimpleImageExtensionExample';
import ImageExtensionWithPopoverExample from './ImageExtensionWithPopoverExample';
import readFile from '@/utils/read-file';
import { SITE_TITLE } from '@/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Custom node view | ${SITE_TITLE}`,
};

const Page = async () => {
  const simpleExtensionCode = await readFile({
    path: '/app/guides/custom-node-view/SimpleImageExtension.tsx',
    replaces: [
      [`/* eslint-disable @next/next/no-img-element */\n`, ''],
      ['SimpleImageExtension', 'DemoExtension'],
    ],
  });
  const simpleExampleCode = await readFile({
    path: '/app/guides/custom-node-view/SimpleImageExtensionExample.tsx',
    replaces: [
      ['SimpleImageExtension', 'DemoExtension'],
      ['DemoExtensionExample', 'Demo'],
    ],
  });

  const popoverExtensionCode = await readFile({
    path: '/app/guides/custom-node-view/ImageExtensionWithPopover.tsx',
    replaces: [['ImageExtensionWithPopover', 'DemoExtension']],
  });
  const popoverExampleCode = await readFile({
    path: '/app/guides/custom-node-view/ImageExtensionWithPopoverExample.tsx',
    replaces: [
      ['ImageExtensionWithPopoverExample', 'Demo'],
      ['ImageExtensionWithPopover', 'DemoExtension'],
    ],
  });

  return (
    <Stack>
      <Heading label='Custom node view' />
      <Heading order={2} label='Simple node view' />
      <Text>
        You can extends the extension and implement your own node view as
        follows:
      </Text>
      <CodeHighlightTabs
        code={[
          { fileName: 'Demo.tsx', code: simpleExampleCode, language: 'tsx' },
          {
            fileName: 'DemoExtension.tsx',
            code: simpleExtensionCode,
            language: 'tsx',
          },
        ]}
      />
      <SimpleImageExtensionExample />
      <Heading order={2} label='With popover' />
      <Text>
        You can continue to use the Resizable Image component from the
        extension. By doing this, you can add a{' '}
        <Anchor href='https://mantine.dev/core/popover/' target='_blank'>
          Popover
        </Anchor>{' '}
        to the image without having to re-implement the resizable feature.
      </Text>
      <CodeHighlightTabs
        code={[
          { fileName: 'Demo.tsx', code: popoverExampleCode, language: 'tsx' },
          {
            fileName: 'DemoExtension.tsx',
            code: popoverExtensionCode,
            language: 'tsx',
          },
        ]}
      />
      <ImageExtensionWithPopoverExample />
    </Stack>
  );
};

export default Page;
