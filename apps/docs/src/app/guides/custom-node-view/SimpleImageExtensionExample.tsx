'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { SimpleImageExtension } from './SimpleImageExtension';

const SimpleImageExtensionExample = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      SimpleImageExtension.configure({
        defaultWidth: 200,
        defaultHeight: 200,
      }),
    ],
    content: /* html */ `
      <p>This image can't be resized anymore</p>
      <p>
        <img
          src="/example.jpg"
          alt="image alt"
          title="image title"
          width="300"
          data-keep-ratio="true"
        >
      </p>
    `,
    immediatelyRender: false,
  });

  return (
    <div>
      <EditorContent editor={editor} className='editor' />
    </div>
  );
};
export default SimpleImageExtensionExample;
