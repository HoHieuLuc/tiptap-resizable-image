import { ResizableImageHTMLAttributes } from './resizable-image.types';
import { createEditor, minifyHtml, userEvent } from './test-utils';

// Add jest-prosemirror assertions
describe('resizable-image', () => {
  const defaultWidth = 200;
  const defaultHeight = 200;

  const defaultContent = /* html */ `
    <p>
      <img src="" />
    </p>
  `;

  const defaultImageProps = {
    src: 'src',
    alt: 'alt',
    title: 'title',
    width: '250',
    height: '150',
    style: 'max-width: 250px',
    'data-keep-ratio': 'true',
    class: 'class',
  };

  const defaultImage = document.createElement('img');

  Object.keys(defaultImageProps).forEach((key) => {
    defaultImage.setAttribute(
      key,
      defaultImageProps[key as keyof typeof defaultImageProps]
    );
  });

  it('renders html correctly', () => {
    const expectedContent = /* html */ `
      <p>
        <span class="node-imageComponent">
          <span class="image-component">
            ${defaultImage.outerHTML}
          </span>
        </span>
      </p>
    `;

    const editor = createEditor({
      content: /* html */ `
        <p>
          ${defaultImage.outerHTML}
        </p>
      `,
    });

    expect(editor.getHTML()).toBe(minifyHtml(expectedContent));
  });

  it('sets default width and height correctly', () => {
    const editor = createEditor({
      resizableImageOptions: {
        defaultWidth,
        defaultHeight,
      },
      content: defaultContent,
    });

    const image = editor.view.dom.querySelector('img');

    if (!image) {
      throw new Error('Image not found');
    }

    expect(image.width).toBe(defaultWidth);
    expect(image.height).toBe(defaultHeight);
  });

  it('renders caption correctly', () => {
    const editor = createEditor({
      resizableImageOptions: {
        withCaption: true,
        captionProps: {
          className: 'my-caption',
        },
      },
      content: /* html */ `
        <p>
          <span>
            <img src="" />
            <span>Image caption</span>
          </span>
        </p>
      `,
    });

    const caption = editor.view.dom.querySelector('img + span');

    if (!caption) {
      throw new Error('Caption not found');
    }

    expect(caption.textContent).toBe('Image caption');
    expect(caption.className).toBe('caption my-caption');
  });

  it('should not render caption if it is empty', () => {
    const editor = createEditor({
      resizableImageOptions: {
        withCaption: true,
      },
      content: /* html */ `
        <p>
          <span>
            <img src="" />
          </span>
          <span>
            <img src="" />
            <span></span>
          </span>
        </p>
      `,
    });

    const captions = editor.view.dom.querySelectorAll('img + span');

    expect(captions.length).toBe(0);
  });

  it('setResizableImage command should work correctly', () => {
    const editor = createEditor({
      resizableImageOptions: {
        withCaption: true,
      },
    });

    const imageAttrs: ResizableImageHTMLAttributes = {
      src: 'https://src.com/src.png',
      alt: 'alt',
      title: 'title',
      width: 300,
      height: 200,
      'data-keep-ratio': true,
      className: 'my-image',
      caption: 'Image\ncaption',
    };

    editor.commands.setResizableImage(imageAttrs);

    const imageRoot = editor.view.dom.querySelector('.image-component');
    const image = imageRoot?.querySelector('img');
    const caption = imageRoot?.querySelector('img + span');

    if (!imageRoot || !image || !caption) {
      throw new Error('Image not found');
    }

    expect(image.src).toBe(imageAttrs.src);
    expect(image.alt).toBe(imageAttrs.alt);
    expect(image.title).toBe(imageAttrs.title);
    expect(image.width).toBe(imageAttrs.width);
    expect(image.height).toBe(imageAttrs.height);
    expect(image.className).toBe(imageAttrs.className);
    expect(image.dataset.keepRatio).toBe('true');
    expect(caption.textContent).toBe(imageAttrs.caption);
  });

  // TODO
  it.skip('triggers context menu on right click', async () => {
    const onContextMenu = vi.fn();

    const editor = createEditor({
      resizableImageOptions: {
        onContextMenu,
      },
      content: defaultContent,
    });

    const image = editor.view.dom.querySelector('img');

    if (!image) {
      throw new Error('Image not found');
    }

    await userEvent.pointer({ keys: '[MouseRight>]', target: image });

    expect(onContextMenu).toHaveBeenCalled();
  });
});
