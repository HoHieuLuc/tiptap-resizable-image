import { useRef } from 'react';
import { ResizableImageNodeViewRendererProps } from '../resizable-image.types';

const CaptionInput = (props: ResizableImageNodeViewRendererProps) => {
  const {
    updateAttributes,
    node: { attrs },
    editor,
    extension,
  } = props;

  const { captionProps } = extension.options;

  const ref = useRef<HTMLSpanElement>(null);

  const onBlur = (event: React.FocusEvent<HTMLSpanElement, Element>) => {
    if (!ref.current) return;

    const { innerText, innerHTML } = event.target;
    const isEmpty = innerText?.replaceAll('\n', '') === '';

    const formattedHTML = innerHTML
      .replaceAll('<div>', '\n')
      .replaceAll('</div>', '')
      .replaceAll('<br>', '');

    const value = isEmpty ? '' : formattedHTML;

    ref.current.innerHTML = value;
    updateAttributes({
      caption: value,
    });
  };

  const onPaste = (event: React.ClipboardEvent<HTMLSpanElement>) => {
    event.preventDefault();

    const text = event.clipboardData.getData('text/plain');
    const selection = window.getSelection();

    if (selection && text) {
      const range = selection.getRangeAt(0);

      selection.deleteFromDocument();
      range.insertNode(document.createTextNode(text));
      range.setStart(range.endContainer, range.endOffset);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    // Select the contents of the caption element when "Ctrl + A" is pressed
    if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
      event.preventDefault();
      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        range.selectNodeContents(event.currentTarget);
        selection.addRange(range);
      }
    }
  };

  return (
    <span
      {...captionProps}
      ref={ref}
      className={`caption ${captionProps?.className || ''}`}
      contentEditable={editor.isEditable}
      onBlur={onBlur}
      onPaste={onPaste}
      onKeyDown={onKeyDown}
      dangerouslySetInnerHTML={{
        __html: attrs.caption || '',
      }}
    />
  );
};

export default CaptionInput;
