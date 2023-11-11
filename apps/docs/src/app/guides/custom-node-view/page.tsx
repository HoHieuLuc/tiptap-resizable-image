import { Anchor, Stack, Text, Title } from '@mantine/core';
import SimpleImageExtensionExample from './SimpleImageExtensionExample';
import readFile from '@/utils/read-file';
import CodeHighlightTabs from '@/components/CodeHighlightTabs/CodeHighlightTabs';
import ImageExtensionWithPopoverExample from './ImageExtensionWithPopoverExample';

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
    replaces: [
      ['ImageExtensionWithPopover', 'DemoExtension'],
    ],
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
      <Title>Custom node view</Title>
      <Title order={2}>Simple node view</Title>
      <Text>
        You can extends the extension and implement your own node view as follows:
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
      <Title order={2}>With popover</Title>
      <Text>
        You can keep using the Resizable Image component from the extension.
        This way, you can add{' '}
        <Anchor href='https://mantine.dev/core/popover/' target='_blank'>
          Popover
        </Anchor>{' '}
        to the image without re-implementing the resizable feature.
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
