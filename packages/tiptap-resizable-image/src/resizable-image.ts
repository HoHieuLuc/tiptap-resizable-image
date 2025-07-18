import { mergeAttributes, Node, nodeInputRule } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import {
  ResizableImageAttributes,
  ResizableImageHTMLAttributes,
  ResizableImageNodeViewRendererProps,
  ResizableImageOptions,
} from './resizable-image.types';
import { ResizableImageNodeView } from './components';

const inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

const getImageDimensions = (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectURL = URL.createObjectURL(file);

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(objectURL);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectURL);
      reject(new Error('Failed to load image'));
    };

    img.src = objectURL;
  });
};

const adjustImageSize = async (
  attrs: ResizableImageHTMLAttributes,
  file: File,
  options: ResizableImageOptions
) => {
  if (!attrs['data-keep-ratio']) {
    return Promise.resolve(attrs);
  }

  const { width: imgWidth, height: imgHeight } = await getImageDimensions(file);
  const width = attrs.width ?? options.defaultWidth;
  const ratio = imgHeight / imgWidth;
  return { ...attrs, width, height: width * ratio };
};

export default Node.create<ResizableImageOptions>({
  name: 'image',
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
            style: [`max-width: ${attributes.width as number}px`].join(';'),
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
      },
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
    root.classList.add('node-image');

    const imageWrapper = document.createElement('span');
    imageWrapper.classList.add('image-component');
    const image = document.createElement('img');

    const imageAttributes = mergeAttributes(
      this.options.HTMLAttributes,
      HTMLAttributes
    );

    Object.keys(imageAttributes).forEach((key) => {
      if (key === 'caption') return;
      image.setAttribute(key, imageAttributes[key]);
    });

    imageWrapper.appendChild(image);

    const attrs = node.attrs as ResizableImageHTMLAttributes;
    if (attrs.caption) {
      const caption = document.createElement('span');
      caption.classList.add(
        'caption',
        ...(this.options.captionProps?.className?.split(' ') || '')
      );
      caption.innerHTML = attrs.caption;
      imageWrapper.appendChild(caption);
    }

    root.appendChild(imageWrapper);

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
        getAttributes: (match) => {
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

            // handle pasting image content
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
              this.options
                .onUpload(file)
                .then((attrs) => adjustImageSize(attrs, file, this.options))
                .then((attrs) => {
                  this.editor
                    .chain()
                    .focus()
                    .setResizableImage(attrs, position, {
                      updateSelection: false,
                    })
                    .run();
                });
            }
            return true;
          },
          handleDrop: (view, dragEvent) => {
            dragEvent.preventDefault();
            const files = dragEvent.dataTransfer?.files;

            const isDroppedFromFileSystem = !dragEvent.dataTransfer?.getData('text/html');

            if (!files || files.length === 0 || !this.options.onUpload || !isDroppedFromFileSystem) {
              return false;
            }

            const coordinates = view.posAtCoords({ left: dragEvent.clientX, top: dragEvent.clientY });

            for (const file of files) {
              this.options
                .onUpload(file)
                .then((attrs) => adjustImageSize(attrs, file, this.options))
                .then((attrs) => {
                  this.editor
                    .chain()
                    .focus()
                    .setResizableImage(attrs, coordinates?.pos, {
                      updateSelection: false,
                    })
                    .run();
                });
            }
          },
        },
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer((props) =>
      ResizableImageNodeView(
        props as unknown as ResizableImageNodeViewRendererProps
      )
    );
  },
});
