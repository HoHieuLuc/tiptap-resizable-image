'use client';

import '@mantine/core/styles.layer.css';
import '@mantine/code-highlight/styles.layer.css';
import '@mantine/spotlight/styles.layer.css';
import '@mantine/tiptap/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';
import 'tiptap-extension-resizable-image/styles.css';
import '@/app/layout.css';
import '@/styles/editor.css';

import { NavLink, createTheme } from '@mantine/core';
import navLinkClasses from './NavLink.module.css';

export const theme = createTheme({
  components: {
    NavLink: NavLink.extend({
      defaultProps: {
        classNames: {
          label: navLinkClasses.label,
        }
      }
    })
  }
});
