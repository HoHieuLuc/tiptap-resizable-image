'use client';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useContextMenu } from 'mantine-contextmenu';
import { ResizableImage } from 'tiptap-extension-resizable-image';

const ContextMenuExample = () => {
  const { showContextMenu } = useContextMenu();

  const editor = useEditor({
    extensions: [
      StarterKit,
      ResizableImage.configure({
        defaultWidth: 200,
        defaultHeight: 200,
        onContextMenu(event, payload) {
          showContextMenu([
            {
              key: 'copy',
              title: 'Copy to clipboard',
              onClick: () => alert(`You copied ${payload.node.attrs.src}`),
            },
            {
              key: 'delete',
              title: 'Delete this image',
              onClick: () =>
                payload.editor.chain().focus().deleteSelection().run(),
            },
          ])(event);
        },
      }),
    ],
    content: /* html */ `
      <p>Right click this image to show the context menu</p>
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
export default ContextMenuExample;
