import { CSSProperties, DataHTMLAttributes, useState } from 'react';
import {
  makeMoveable,
  OnScale,
  OnScaleEnd,
  Scalable,
  ScalableProps,
} from 'react-moveable';
import { ResizableImageNodeViewRendererProps } from './resizable-image.types';
import { useClickOutside } from './use-click-outside';

type ImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> &
  DataHTMLAttributes<HTMLImageElement>;

const Moveable = makeMoveable<ScalableProps>([Scalable]);

const ResizableImageComponent = (
  props: ResizableImageNodeViewRendererProps
) => {
  const { updateAttributes, node, extension, editor } = props;

  const [focused, setFocused] = useState(false);
  const imageRef = useClickOutside<HTMLImageElement>(() => setFocused(false));

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

  const onScale = (event: OnScale) => {
    event.target.style.transform = event.drag.transform;
  };

  const onScaleEnd = (event: OnScaleEnd) => {
    const rect = event.target.getBoundingClientRect();
    if (rect.width <= options.maxWidth) {
      updateAttributes({
        width: rect.width,
        height: rect.height,
      });
    } else {
      const _height = keepRatio
        ? options.maxWidth * (rect.height / rect.width)
        : rect.height;
      updateAttributes({
        width: options.maxWidth,
        height: _height,
      });
    }
    event.target.style.transform = '';
    setFocused(false);
  };

  if (disabled) {
    return <img {...sharedImageProps} />;
  }

  return (
    <>
      <img
        {...sharedImageProps}
        ref={imageRef}
        onClick={() => setFocused(true)}
        onDrag={() => setFocused(true)}
        onContextMenu={(event) => {
          setFocused(true);
          options.onContextMenu?.(event, {
            setFocused,
            ...props,
          });
        }}
      />
      {focused && (
        <div className='ghost'>
          <img {...sharedImageProps} />
        </div>
      )}
      <Moveable
        target={focused ? imageRef : null}
        scalable={true}
        keepRatio={keepRatio}
        origin={false}
        throttleScale={0}
        renderDirections={['se', 'nw', 'ne', 'sw']}
        snappable={true}
        onScale={onScale}
        onScaleEnd={onScaleEnd}
        {...options.moveableProps}
      />
    </>
  );
};

export default ResizableImageComponent;
