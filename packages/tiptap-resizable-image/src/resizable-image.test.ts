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

  const imageProps = {
    src: 'src',
    alt: 'alt',
    title: 'title',
    width: '250',
    height: '150',
    style: 'max-width: 250px',
    'data-keep-ratio': 'true',
    class: 'class',
  };

  const image = document.createElement('img');

  Object.keys(imageProps).forEach((key) => {
    image.setAttribute(key, imageProps[key as keyof typeof imageProps]);
  });

  it('renders html correctly', () => {
    const expectedContent = /* html */ `
      <p>
        <span class="node-imageComponent image-component">
          ${image.outerHTML}
        </span>
      </p>
    `;

    const editor = createEditor({
      content: /* html */ `
        <p>
          ${image.outerHTML}
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

    const _image = editor.view.dom.querySelector('img');

    if (!_image) {
      throw new Error('Image not found');
    }

    expect(_image.width).toBe(defaultWidth);
    expect(_image.height).toBe(defaultHeight);
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

  it('should not render caption if it is empty' , () => {
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

  // TODO
  it.skip('triggers context menu on right click', async () => {
    const onContextMenu = vi.fn();

    const editor = createEditor({
      resizableImageOptions: {
        onContextMenu,
      },
      content: defaultContent,
    });

    const _image = editor.view.dom.querySelector('img');

    if (!_image) {
      throw new Error('Image not found');
    }

    await userEvent.pointer({ keys: '[MouseRight>]', target: _image });

    expect(onContextMenu).toHaveBeenCalled();
  });
});
