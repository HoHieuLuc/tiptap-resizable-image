import { ActionIcon, Popover } from '@mantine/core';
import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
} from '@tabler/icons-react';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import {
  ResizableImage,
  ResizableImageComponent,
  ResizableImageNodeViewRendererProps,
} from '@hhl/tiptap-resizable-image';

const NodeView = (props: ResizableImageNodeViewRendererProps) => {
  const editor = props.editor;

  const setTextAlign = (textAlign: string) => {
    editor.chain().focus().setTextAlign(textAlign).run();
  };

  return (
    <NodeViewWrapper className='image-component' data-drag-handle>
      <Popover position='bottom' withArrow shadow='md' withinPortal>
        <Popover.Target>
          <div>
            <ResizableImageComponent {...props} />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <ActionIcon.Group>
            <ActionIcon variant='default' onClick={() => setTextAlign('left')}>
              <IconAlignLeft />
            </ActionIcon>
            <ActionIcon
              variant='default'
              onClick={() => setTextAlign('center')}
            >
              <IconAlignCenter />
            </ActionIcon>
            <ActionIcon variant='default' onClick={() => setTextAlign('right')}>
              <IconAlignRight />
            </ActionIcon>
          </ActionIcon.Group>
        </Popover.Dropdown>
      </Popover>
    </NodeViewWrapper>
  );
};

export const ImageExtensionWithPopover = ResizableImage.extend({
  addNodeView() {
    return ReactNodeViewRenderer(NodeView);
  },
});
