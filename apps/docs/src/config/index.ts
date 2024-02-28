import { ThemeIconProps } from '@mantine/core';
import {
  TablerIconsProps,
  IconHome,
  IconRocket,
  IconBrandCss3,
  IconArrowGuide,
  IconHearts,
  IconList,
} from '@tabler/icons-react';

export const REPO_LINK = 'https://github.com/HoHieuLuc/tiptap-resizable-image';
export const NPM_LINK = 'https://www.npmjs.com/package/tiptap-extension-resizable-image';
export const LICENSE_LINK = 'https://github.com/HoHieuLuc/tiptap-resizable-image/blob/master/LICENSE';
export const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] || 'https://tiptap-resizable-image.vercel.app';
export const SITE_TITLE = 'Tiptap Resizable Image';

export interface Route {
  label: string;
  href: string;
  icon?: React.FC<TablerIconsProps>;
  iconProps?: ThemeIconProps;
  subLinks?: Array<Route>;
}

export const ROUTES: Array<Route> = [
  {
    label: 'Home',
    href: '/',
    icon: IconHome,
    iconProps: {
      color: 'green',
    },
  },
  {
    label: 'Getting Started',
    href: '/getting-started',
    icon: IconRocket,
    iconProps: {
      color: 'orange',
    },
  },
  {
    label: 'Styling',
    href: '/styling',
    icon: IconBrandCss3,
  },
  {
    label: 'Guides',
    href: '/guides',
    icon: IconArrowGuide,
    iconProps: {
      color: 'violet',
    },
    subLinks: [
      {
        label: 'Image caption',
        href: '/guides/caption',
      },
      {
        label: 'Pasting & dropping',
        href: '/guides/pasting-and-dropping',
      },
      {
        label: 'Context menu',
        href: '/guides/context-menu',
      },
      {
        label: 'Custom node view',
        href: '/guides/custom-node-view',
      },
      {
        label: 'Usage with Mantine Tiptap',
        href: '/guides/mantine-tiptap',
      },
    ],
  },
  {
    label: 'Contribute',
    href: '/contribute',
    icon: IconHearts,
    iconProps: {
      color: 'red.7',
    },
  },
  {
    label: 'Changelog',
    href: 'https://github.com/HoHieuLuc/tiptap-resizable-image/blob/master/packages/tiptap-resizable-image/CHANGELOG.md',
    icon: IconList,
    iconProps: {
      color: 'gray.7',
    },
  },
];
