import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import {
  ResizableImageAttributes,
  ResizableImageHTMLAttributes,
  ResizableImageOptions,
} from './resizable-image.types';
import ResizableImageView from './ResizableImageView';
import { Plugin, PluginKey } from '@tiptap/pm/state';
// import imageService from './image.service';

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
      maxHeight: 16384,
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
        tag: `img[data-type="${this.name}"]`,
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
          {
            ['data-type']: this.name,
          },
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
          return commands.insertContentAt(position || this.editor.state.selection.head, {
            type: this.name,
            attrs: {
              ...options,
            },
          });
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
                // 'data-keep-ratio': true,
              });
              return true;
            }

            if (!files || files.length === 0 || !this.options.onUpload) {
              return false;
            }

            // handle pasting file contents
            for (const file of files) {
              void this.options.onUpload(file, this.editor);
            }
            return true;
          },
          handleDrop: (_, dragEvent) => {
            dragEvent.preventDefault();
            const files = dragEvent.dataTransfer?.files;
            if (!files || files.length === 0 || !this.options.onUpload) {
              return false;
            }

            for (const file of files) {
              void this.options.onUpload(file, this.editor);
            }
            return true;
          },
        },
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageView);
  },
});
