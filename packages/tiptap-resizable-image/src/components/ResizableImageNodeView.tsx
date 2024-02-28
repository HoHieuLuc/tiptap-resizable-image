import { ResizableImageNodeViewRendererProps } from '../resizable-image.types';
import { NodeViewWrapper } from '@tiptap/react';
import ResizableImageComponent from './ResizableImageComponent';

const ResizableImageNodeView = (props: ResizableImageNodeViewRendererProps) => {
  return (
    <NodeViewWrapper className='image-component' data-drag-handle>
      <ResizableImageComponent {...props} />
    </NodeViewWrapper>
  );
};

export default ResizableImageNodeView;
