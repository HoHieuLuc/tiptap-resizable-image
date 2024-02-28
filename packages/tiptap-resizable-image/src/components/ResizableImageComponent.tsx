import { CSSProperties, DataHTMLAttributes, useRef } from 'react';
import { ResizableImageNodeViewRendererProps } from '../resizable-image.types';
import CaptionInput from './CaptionInput';
import ImageResizer from './ImageResizer';

type ImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> &
  DataHTMLAttributes<HTMLImageElement>;

const ResizableImageComponent = (
  props: ResizableImageNodeViewRendererProps
) => {
  const { updateAttributes, node, extension, editor } = props;

  const imageRef = useRef<HTMLImageElement>(null);

  const attrs = node.attrs;
  const options = extension.options;
  const disabled = !editor.isEditable;

  const { width, height } = attrs;
  const keepRatio = attrs['data-keep-ratio'];

  const style: CSSProperties | false = !keepRatio && {
    width,
    height,
  };

  const sharedImageProps: ImageProps = {
    ...attrs,
    style: {
      ...(style || {}),
      maxWidth: width,
    },
  };

  const onResizeEnd = (nextWidth: number, nextHeight: number) => {
    if (keepRatio && imageRef.current) {
      imageRef.current.style.width = '';
      imageRef.current.style.height = '';
    }

    updateAttributes({
      width: nextWidth,
      height: nextHeight,
    });
  };

  const onContextMenu = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    options.onContextMenu?.(event, props);
  };

  if (disabled) {
    return (
      <>
        <img {...sharedImageProps} />
        {options.withCaption && attrs.caption && <CaptionInput {...props} />}
      </>
    );
  }

  return (
    <>
      <img {...sharedImageProps} ref={imageRef} onContextMenu={onContextMenu} />
      {options.withCaption && <CaptionInput {...props} />}
      <ImageResizer
        editor={editor}
        imageRef={imageRef}
        minWidth={options.minWidth}
        maxWidth={options.maxWidth}
        minHeight={options.minHeight}
        maxHeight={options.maxHeight}
        keepRatio={keepRatio}
        onResizeEnd={onResizeEnd}
      />
    </>
  );
};

export default ResizableImageComponent;
