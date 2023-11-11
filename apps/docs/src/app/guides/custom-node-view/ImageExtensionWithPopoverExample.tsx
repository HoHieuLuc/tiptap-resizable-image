'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { ImageExtensionWithPopover } from './ImageExtensionWithPopover';

const ImageExtensionWithPopoverExample = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      ImageExtensionWithPopover.configure({
        defaultWidth: 200,
        defaultHeight: 200,
      }),
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
export default ImageExtensionWithPopoverExample;
