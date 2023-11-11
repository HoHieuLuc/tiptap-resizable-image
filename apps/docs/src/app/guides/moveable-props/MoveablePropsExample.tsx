'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ResizableImage } from 'tiptap-resizable-image';

const MoveablePropsExample = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ResizableImage.configure({
        defaultWidth: 200,
        defaultHeight: 200,
        moveableProps: {
          renderDirections: ['se'],
        },
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
export default MoveablePropsExample;
