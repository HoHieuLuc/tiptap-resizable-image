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

const ResizableImageView = ({
  updateAttributes,
  ...props
}: ResizableImageNodeViewRenderedProps) => {
  const [imageFocused, setImageFocused] = useState(false);
  const imageRef = useClickOutside<HTMLImageElement>(() =>
    setImageFocused(false)
  );

  const attrs = props.node.attrs;
  const options = props.extension.options;

  const { width, height } = attrs;
  const isResponsive = attrs['data-keep-ratio'];

  const style: CSSProperties | false = !isResponsive && {
    width,
    height,
    objectFit: 'fill',
  };

  const sharedImageProps: ImageProps = {
    ...attrs,
    style: {
      ...(style || {}),
      maxWidth: width || options.maxWidth,
    }
  };

  return (
    <NodeViewWrapper className='image-component' data-drag-handle>
      <img
        {...sharedImageProps}
        ref={imageRef}
        onClick={() => setImageFocused(true)}
        onDrag={() => setImageFocused(true)}
        // TODO:
        // onContextMenu={showContextMenu((close) => {
        //   setIsImageFocused(true);
        //   return (
        //     <ImageContextMenu
        //       onClick={() => {
        //         close();
        //         open();
        //       }}
        //     />
        //   );
        // })}
      />
      {imageFocused && (
        <div className='ghost' style={{ position: 'absolute', top: 0 }}>
          <img
            {...sharedImageProps}
            style={{ opacity: 0.3, ...sharedImageProps.style }}
          />
        </div>
      )}
      <Moveable
        target={imageFocused ? imageRef : null}
        scalable={true}
        keepRatio={isResponsive}
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

          setImageFocused(false);
        }}
      />
    </NodeViewWrapper>
  );
};

export default ResizableImageView;
