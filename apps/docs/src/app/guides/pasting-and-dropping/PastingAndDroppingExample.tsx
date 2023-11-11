'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ResizableImage } from 'tiptap-resizable-image';

const PastingAndDroppingExample = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ResizableImage.configure({
        defaultWidth: 200,
        defaultHeight: 200,
        async onUpload(file: File) {
          /* replace with your own upload handler */
          const src = URL.createObjectURL(file);
          return {
            src,
            'data-keep-ratio': true,
          };
        },
      }),
    ],
    content: /* html */ `
      <p>Try pasting/dropping an image from the file system here</p>
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

export default PastingAndDroppingExample;
