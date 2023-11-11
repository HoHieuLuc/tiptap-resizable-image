import { CSSProperties, DataHTMLAttributes, useState } from 'react';
import { makeMoveable, Scalable, ScalableProps } from 'react-moveable';
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
    objectFit: 'fill',
  };

  const sharedImageProps: ImageProps = {
    ...options.HTMLAttributes,
    ...attrs,
    style: {
      ...(style || {}),
      maxWidth: width || options.maxWidth,
    },
  };

  if (disabled) {
    return (
      <img {...sharedImageProps} />
    );
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
        <div className='ghost' style={{ position: 'absolute', top: 0 }}>
          <img
            {...sharedImageProps}
            style={{ opacity: 0.3, ...sharedImageProps.style }}
          />
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
        onScale={(e) => {
          e.target.style.transform = e.drag.transform;
        }}
        onScaleEnd={(e) => {
          const rect = e.target?.getBoundingClientRect();
          updateAttributes({
            width: rect?.width,
            height: rect?.height,
          });
          e.target.style.transform = '';

          setFocused(false);
        }}
        {...options.moveableProps}
      />
    </>
  );
};

export default ResizableImageComponent;
