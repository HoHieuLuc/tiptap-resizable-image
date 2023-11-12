# `tiptap-extension-resizable-image`

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
    extensions: [
      StarterKit,
      ResizableImage,
    ],
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

## License
The [MIT License](https://github.com/HoHieuLuc/tiptap-resizable-image/blob/master/LICENSE).
