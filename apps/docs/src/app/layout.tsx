import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import Shell from '@/components/Shell/Shell';
import { ContextMenuProvider } from 'mantine-contextmenu';
import { theme } from './theme';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tiptap Resizable Image',
  description: 'A library designed to enrich your rich text editor with advanced image control, offering flexibility and customization.',
  icons: {
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Tiptap Resizable Image',
    description: 'A library designed to enrich your rich text editor with advanced image control, offering flexibility and customization.',
    images: [
      {
        url: '/social-preview.png',
        width: 1280,
        height: 640,
      },
    ],
    type: 'website',
  },
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
