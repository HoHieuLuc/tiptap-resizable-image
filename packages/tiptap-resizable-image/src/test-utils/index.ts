import userEvent from '@testing-library/user-event';
import { minify } from 'html-minifier';
import { createEditor } from './create-editor';

export const minifyHtml = (html: string) => {
  return minify(html, {
    collapseWhitespace: true,
  });
};

export * from '@testing-library/react';
export { userEvent, createEditor };
