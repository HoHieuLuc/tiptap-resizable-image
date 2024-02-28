/* eslint-disable @next/next/no-img-element */
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import {
  ResizableImage,
  ResizableImageNodeViewRendererProps,
} from 'tiptap-extension-resizable-image';

const NodeView = (props: ResizableImageNodeViewRendererProps) => {
  const attrs = props.node.attrs;
  return (
    <NodeViewWrapper className='image-component' data-drag-handle>
      <img
        src={attrs.src}
        alt='image'
        title={`I can't be resized anymore`}
        width={300}
      />
    </NodeViewWrapper>
  );
};

export const SimpleImageExtension = ResizableImage.extend({
  addNodeView() {
    return ReactNodeViewRenderer(NodeView);
  },
});
