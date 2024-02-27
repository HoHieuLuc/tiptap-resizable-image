import { mergeAttributes, Node, nodeInputRule } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import {
  ResizableImageAttributes,
  ResizableImageHTMLAttributes,
  ResizableImageOptions,
} from './resizable-image.types';
import ResizableImageNodeView from './ResizableImageNodeView';
import { Plugin, PluginKey } from '@tiptap/pm/state';

const inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

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
      minWidth: 100,
      maxWidth: 16384,
      minHeight: 100,
      maxHeight: Infinity,
      allowBase64: true,
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
          return element.getAttribute('data-keep-ratio') !== 'false';
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
        default: true,
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
      caption: {
        parseHTML: (element: HTMLElement) => {
          return element.parentElement?.querySelector('span')?.textContent;
        },
        renderHTML() {
          return null;
        },
        default: '',
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: this.options.allowBase64
          ? 'img[src]'
          : 'img[src]:not([src^="data:"])',
      },
      {
        // Ignore image caption element
        tag: 'span > img + span',
        ignore: true,
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    const root = document.createElement('span');
    const image = document.createElement('img');
    root.classList.add('node-imageComponent', 'image-component');

    const imageAttributes = mergeAttributes(
      this.options.HTMLAttributes,
      HTMLAttributes,
    );

    Object.keys(imageAttributes).forEach((key) => {
      if (key === 'caption') return;
      image.setAttribute(key, imageAttributes[key]);
    });

    root.appendChild(image);

    const attrs = node.attrs as ResizableImageHTMLAttributes;
    if (attrs.caption) {
      const caption = document.createElement('span');
      caption.classList.add('caption');
      caption.textContent = attrs.caption;
      root.appendChild(caption);
    }

    return root;
  },

  addCommands() {
    return {
      setResizableImage:
        (attrs, position, options) => ({ commands }) => {
          return commands.insertContentAt(
            position || this.editor.state.selection.head,
            {
              type: this.name,
              attrs,
            },
            options
          );
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: match => {
          const [, , alt, src, title] = match;

          return { src, alt, title };
        },
      }),
    ];
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

            const isPastedFromFileSystem = !clipboardEvent.clipboardData?.getData('text/html');

            if (!files || files.length === 0 || !this.options.onUpload || !isPastedFromFileSystem) {
              return false;
            }

            const position = this.editor.state.selection.head;

            for (const file of files) {
              this.options.onUpload(file).then(attrs => {
                this.editor
                  .chain()
                  .focus()
                  .setResizableImage(attrs, position, { updateSelection: false })
                  .run();
              });
            }
            return true;
          },
          handleDrop: (_, dragEvent) => {
            dragEvent.preventDefault();
            const files = dragEvent.dataTransfer?.files;

            const isDroppedFromFileSystem = !dragEvent.dataTransfer?.getData('text/html');

            if (!files || files.length === 0 || !this.options.onUpload || !isDroppedFromFileSystem) {
              return false;
            }

            const position = this.editor.state.selection.head;

            for (const file of files) {
              this.options.onUpload(file).then(attrs => {
                this.editor
                  .chain()
                  .focus()
                  .setResizableImage(attrs, position, { updateSelection: false })
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
