import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import Shell from '@/components/Shell/Shell';
import { ContextMenuProvider } from 'mantine-contextmenu';
import { theme } from './theme';

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
        <MantineProvider theme={theme} withCssVariables defaultColorScheme='auto'>
          <ContextMenuProvider>
            <Shell>{children}</Shell>
          </ContextMenuProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
