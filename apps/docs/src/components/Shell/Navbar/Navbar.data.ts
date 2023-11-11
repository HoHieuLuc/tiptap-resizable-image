export interface NavbarLink {
  label: string;
  href: string;
  subLinks?: Array<NavbarLink>;
}

const navbarLinks: Array<NavbarLink> = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Getting Started',
    href: '/getting-started',
  },
  {
    label: 'Styling',
    href: '/styling',
  },
  {
    label: 'Guides',
    href: '/guides',
    subLinks: [
      {
        label: 'Context menu',
        href: '/guides/context-menu',
      },
    ],
  },
];

export default navbarLinks;
