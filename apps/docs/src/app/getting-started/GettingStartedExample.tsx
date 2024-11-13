'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ResizableImage } from 'tiptap-extension-resizable-image';

const GettingStartedExample = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ResizableImage.configure({
        defaultWidth: 200,
        defaultHeight: 200,
      }),
    ],
    content: /* html */ `
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

export default GettingStartedExample;
