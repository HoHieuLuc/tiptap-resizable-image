'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ResizableImage } from 'tiptap-extension-resizable-image';

const CaptionManualExample = () => {
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

  const addCaption = () => {
    editor?.commands.updateAttributes('image', {
      caption: '',
    });
  };

  const removeCaption = () => {
    editor?.commands.updateAttributes('image', {
      caption: undefined,
    });
  };

  return (
    <div>
      <button
        onClick={addCaption}
        disabled={
          !editor?.isActive('image') ||
          typeof editor?.getAttributes('image').caption === 'string'
        }
      >
        Add caption
      </button>
      <button
        onClick={removeCaption}
        disabled={
          !editor?.isActive('image') ||
          typeof editor?.getAttributes('image').caption !== 'string'
        }
      >
        Remove caption
      </button>
      <EditorContent editor={editor} className='editor' />
    </div>
  );
};

export default CaptionManualExample;
