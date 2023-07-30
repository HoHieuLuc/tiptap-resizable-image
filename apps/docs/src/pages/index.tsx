import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import classes from '@/styles/editor.module.css';
import ResizableImage from 'tiptap-resizable-image';
import 'tiptap-resizable-image/styles.css';
import { useState } from 'react';

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ResizableImage.configure({
        defaultWidth: 200,
        defaultHeight: 200,
        HTMLAttributes: {
          class: 'hahah'
        }
      }),
    ],
    content: /* html */ `
      <p>
        <span class="node-imageComponent">
          <img
            data-type="imageComponent"
            src="https://daily.jstor.org/wp-content/uploads/2016/10/Moving_Forest_1050_700.jpg"
            alt=""
            title="hihii"
            data-keep-ratio="true"
            class="ahahha"
          >
        </span>
      </p>
    `,
  });
  const [src, setSrc] = useState('');

  return (
    <div>
      <input value={src} onChange={(e) => setSrc(e.target.value)} />
      <button
        onClick={() => {
          editor.chain().focus().setResizableImage({
            src: src,
            width: 100,
            height: 100,
            'data-keep-ratio': true,
          }).run();;
        }}
      >
        test
      </button>
      <EditorContent editor={editor} className={classes.editor} />
    </div>
  );
};

export default Tiptap;
