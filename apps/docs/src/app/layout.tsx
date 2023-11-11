import '@mantine/core/styles.layer.css';
import '@mantine/code-highlight/styles.layer.css';
import '@mantine/spotlight/styles.layer.css';
import '@mantine/tiptap/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';
import './layout.css';
import 'tiptap-resizable-image/styles.css';
import '@/styles/editor.css';

import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import Shell from '@/components/Shell/Shell';
import { ContextMenuProvider } from 'mantine-contextmenu';

export const metadata = {
  title: 'Tiptap Resizable Image',
  description: 'Tiptap Resizable Image extension',
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript defaultColorScheme='auto' />
      </head>
      <body>
        <MantineProvider withCssVariables defaultColorScheme='auto'>
          <ContextMenuProvider>
            <Shell>{children}</Shell>
          </ContextMenuProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
