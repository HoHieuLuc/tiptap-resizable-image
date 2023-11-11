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
export default SimpleImageExtensionExample;
