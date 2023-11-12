import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import Shell from '@/components/Shell/Shell';
import { ContextMenuProvider } from 'mantine-contextmenu';
import { theme } from './theme';
import { Metadata } from 'next';
import { SITE_TITLE } from '@/config';

export const metadata: Metadata = {
  metadataBase: new URL('https://raw.githubusercontent.com'),
  title: SITE_TITLE,
  description: 'A library designed to enrich your rich text editor with advanced image control, offering flexibility and customization.',
  icons: {
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: SITE_TITLE,
    description: 'A library designed to enrich your rich text editor with advanced image control, offering flexibility and customization.',
    images: [
      {
        url: 'https://raw.githubusercontent.com/HoHieuLuc/tiptap-resizable-image/master/apps/docs/public/social-preview.png',
        width: 1280,
        height: 640,
      },
    ],
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
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
