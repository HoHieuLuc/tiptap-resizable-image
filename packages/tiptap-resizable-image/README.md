# `tiptap-extension-resizable-image`

![Pull request workflows](https://github.com/HoHieuLuc/tiptap-resizable-image/actions/workflows/pull_request.yml/badge.svg)
[![NPM](https://img.shields.io/npm/l/tiptap-extension-resizable-image)](https://github.com/HoHieuLuc/tiptap-resizable-image/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/tiptap-extension-resizable-image)](https://www.npmjs.com/package/tiptap-extension-resizable-image)
[![GitHub Repo stars](https://img.shields.io/github/stars/HoHieuLuc/tiptap-resizable-image)](https://github.com/HoHieuLuc/tiptap-resizable-image/stargazers)

## Links

- [Documentation](https://tiptap-resizable-image.vercel.app/)
- [Contribute](https://tiptap-resizable-image.vercel.app/contribute)
- [Changelog](https://github.com/HoHieuLuc/tiptap-resizable-image/blob/master/packages/tiptap-resizable-image/CHANGELOG.md)

## Quickstart

Installation

```sh
npm install tiptap-extension-resizable-image
```

Import the CSS file:

```tsx
import 'tiptap-extension-resizable-image/styles.css';
```

Add the extension to Tiptap:

```tsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ResizableImage } from 'tiptap-extension-resizable-image';

const Demo = () => {
  const editor = useEditor({
    extensions: [StarterKit, ResizableImage],
    content: /* html */ `
      <p>
        <img
          src="https://daily.jstor.org/wp-content/uploads/2016/10/Moving_Forest_1050_700.jpg"
          alt="image alt"
          title="image title"
          width="300"
          data-keep-ratio="true"
        >
      </p>
    `,
  });

  return (
    <div>
      <EditorContent editor={editor} className='editor' />
    </div>
  );
};

export default Demo;
```

## Commands

### setResizableImage

```tsx
editor.commands.setResizableImage({
  src: '',
  alt: '',
  title: '',
  width: 200,
  height: 200,
  className: '',
  'data-keep-ratio': true,
  caption: '',
});
```

## License

The [MIT License](https://github.com/HoHieuLuc/tiptap-resizable-image/blob/master/LICENSE).
