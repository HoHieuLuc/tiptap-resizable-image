import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import {
  ResizableImageAttributes,
  ResizableImageHTMLAttributes,
  ResizableImageOptions,
} from './resizable-image.types';
import ResizableImageNodeView from './ResizableImageNodeView';
import { Plugin, PluginKey } from '@tiptap/pm/state';

export default Node.create<ResizableImageOptions>({
  name: 'imageComponent',
  group: 'inline',
  inline: true,
  draggable: true,
  atom: true,

  addOptions(): ResizableImageOptions {
    return {
      HTMLAttributes: {},
      defaultHeight: 500,
      defaultWidth: 500,
      maxWidth: 16384,
    };
  },

  addAttributes(): ResizableImageAttributes {
    return {
      src: {
        default: '',
      },
      alt: {
        default: '',
      },
      title: {
        default: '',
      },
      width: {
        default: this.options.defaultWidth,
      },
      height: {
        default: this.options.defaultHeight,
      },
      'data-keep-ratio': {
        parseHTML: (element) => {
          return element.getAttribute('data-keep-ratio') === 'true';
        },
        renderHTML(attributes: ResizableImageHTMLAttributes) {
          if (!attributes['data-keep-ratio']) {
            return {};
          }
          return {
            style: [
              `max-width: ${attributes.width as number}px`,
            ].join(';'),
            'data-keep-ratio': 'true',
          };
        },
        default: false,
      },
      className: {
        parseHTML: (element: HTMLElement) => {
          return element.getAttribute('class');
        },
        renderHTML: (attrs: ResizableImageHTMLAttributes) => {
          return {
            class: attrs.className,
          };
        },
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      {
        class: 'node-imageComponent',
      },
      [
        'img',
        mergeAttributes(
          this.options.HTMLAttributes,
          HTMLAttributes,
        ),
      ],
    ];
  },

  addCommands() {
    return {
      setResizableImage:
        (options, position) => ({ commands }) => {
          return commands.insertContentAt(
            position || this.editor.state.selection.head,
            {
              type: this.name,
              attrs: {
                ...options,
              },
            },
            {
              updateSelection: false,
            }
          );
        },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey(this.name),
        props: {
          handlePaste: (_, clipboardEvent, slice) => {
            const files = clipboardEvent.clipboardData?.files;

            // handle pasting imageComponent content
            if (slice.content.firstChild?.type.name === this.name) {
              this.editor.commands.setResizableImage({
                ...(slice.content.firstChild.attrs as ResizableImageHTMLAttributes),
              });
              return true;
            }

            if (!files || files.length === 0 || !this.options.onUpload) {
              return false;
            }

            const position = this.editor.state.selection.head;

            for (const file of files) {
              this.options.onUpload(file).then(attrs => {
                this.editor
                  .chain()
                  .focus()
                  .setResizableImage(attrs, position)
                  .run();
              });
            }
            return true;
          },
          handleDrop: (_, dragEvent) => {
            dragEvent.preventDefault();
            const files = dragEvent.dataTransfer?.files;
            if (!files || files.length === 0 || !this.options.onUpload) {
              return false;
            }

            const position = this.editor.state.selection.head;

            for (const file of files) {
              this.options.onUpload(file).then(attrs => {
                this.editor
                  .chain()
                  .focus()
                  .setResizableImage(attrs, position)
                  .run();
              });
            }
          },
        },
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageNodeView);
  },
});
