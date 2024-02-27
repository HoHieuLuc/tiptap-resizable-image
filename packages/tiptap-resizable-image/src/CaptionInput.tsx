import { ResizableImageNodeViewRendererProps } from './resizable-image.types';

const CaptionInput = (props: ResizableImageNodeViewRendererProps) => {
  const {
    updateAttributes,
    node: { attrs },
    editor,
    extension,
  } = props;

  const { captionProps } = extension.options;

  const onBlur = (event: React.FocusEvent<HTMLSpanElement, Element>) => {
    updateAttributes({
      caption: event.target.textContent || '',
    });
  };

  const onPaste = (event: React.ClipboardEvent<HTMLSpanElement>) => {
    event.preventDefault();

    // strip the html tags
    const text = event.clipboardData
      .getData('text/plain')
      .replace('<', '&lt;')
      .replace('>', '&gt;');
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
      className={`caption ${captionProps?.className}`}
      contentEditable={editor.isEditable}
      suppressContentEditableWarning
      onBlur={onBlur}
      onPaste={onPaste}
      onKeyDown={onKeyDown}
    >
      {attrs.caption}
    </span>
  );
};

export default CaptionInput;
