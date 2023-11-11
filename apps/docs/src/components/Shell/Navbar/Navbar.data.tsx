import { ThemeIconProps } from '@mantine/core';
import {
  IconArrowGuide,
  IconBrandCss3,
  IconHearts,
  IconHome,
  IconRocket,
  IconList,
} from '@tabler/icons-react';

export interface NavbarLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
  iconProps?: ThemeIconProps;
  subLinks?: Array<NavbarLink>;
}

const navbarLinks: Array<NavbarLink> = [
  {
    label: 'Home',
    href: '/',
    icon: <IconHome />,
    iconProps: {
      color: 'green',
    },
  },
  {
    label: 'Getting Started',
    href: '/getting-started',
    icon: <IconRocket />,
    iconProps: {
      color: 'orange',
    },
  },
  {
    label: 'Styling',
    href: '/styling',
    icon: <IconBrandCss3 />,
  },
  {
    label: 'Guides',
    href: '/guides',
    icon: <IconArrowGuide />,
    iconProps: {
      color: 'violet',
    },
    subLinks: [
      {
        label: 'Pasting & dropping',
        href: '/guides/pasting-and-dropping',
      },
      {
        label: 'Override moveable props',
        href: '/guides/moveable-props',
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
    icon: <IconHearts />,
    iconProps: {
      color: 'red.7',
    },
  },
  {
    label: 'Changelog',
    // TODO: add changelog
    href: '/changelog',
    icon: <IconList />,
    iconProps: {
      color: 'gray.7',
    },
  },
];

export default navbarLinks;
