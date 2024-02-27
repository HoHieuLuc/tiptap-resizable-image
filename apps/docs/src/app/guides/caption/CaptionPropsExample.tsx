'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { CSSProperties } from 'react';
import { ResizableImage } from 'tiptap-extension-resizable-image';

const CaptionPropsExample = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ResizableImage.configure({
        defaultWidth: 200,
        defaultHeight: 200,
        withCaption: true,
        captionProps: {
          style: {
            color: 'yellow',
            fontStyle: 'italic',
            '--caption-placeholder': '"Caption placeholder..."'
          } as CSSProperties
        }
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

export default CaptionPropsExample;
