import { CSSProperties, DataHTMLAttributes, useState } from 'react';
import { makeMoveable, Scalable, ScalableProps } from 'react-moveable';
import { ResizableImageNodeViewRenderedProps } from './resizable-image.types';
import { NodeViewWrapper } from '@tiptap/react';
import { useClickOutside } from './use-click-outside';

type ImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> &
  DataHTMLAttributes<HTMLImageElement>;

const Moveable = makeMoveable<ScalableProps>([Scalable]);

const ResizableImageView = (
  nodeViewRenderedProps: ResizableImageNodeViewRenderedProps
) => {
  const { updateAttributes, ...props } = nodeViewRenderedProps;

  const [focused, setFocused] = useState(false);
  const imageRef = useClickOutside<HTMLImageElement>(() => setFocused(false));

  const attrs = props.node.attrs;
  const options = props.extension.options;
  const disabled = !props.editor.isEditable;

  const { width, height } = attrs;
  const keepRatio = attrs['data-keep-ratio'];

  const style: CSSProperties | false = !keepRatio && {
    width,
    height,
    objectFit: 'fill',
  };

  const sharedImageProps: ImageProps = {
    ...attrs,
    style: {
      ...(style || {}),
      maxWidth: width || options.maxWidth,
    },
  };

  if (disabled) {
    return (
      <NodeViewWrapper className='image-component'>
        <img {...sharedImageProps} />
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper className='image-component' data-drag-handle>
      <img
        {...sharedImageProps}
        ref={imageRef}
        onClick={() => setFocused(true)}
        onDrag={() => setFocused(true)}
        onContextMenu={(event) => {
          options.onContextMenu?.(event, {
            setFocused,
            ...nodeViewRenderedProps,
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
        className='moveable'
        bounds={{
          left: 10,
          top: 10,
          position: 'css',
        }}
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
      />
    </NodeViewWrapper>
  );
};

export default ResizableImageView;
