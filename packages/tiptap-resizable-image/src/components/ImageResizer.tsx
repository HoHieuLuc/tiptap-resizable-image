// see: https://github.com/facebook/lexical/blob/0361b50500f339e4e0f147d945362f00045f692d/packages/lexical-playground/src/ui/ImageResizer.tsx

import { useRef } from 'react';
import { Editor } from '@tiptap/core';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const Direction = {
  east: 1 << 0,
  north: 1 << 3,
  south: 1 << 1,
  west: 1 << 2,
};

interface Positioning {
  currentHeight: number;
  currentWidth: number;
  direction: number;
  isResizing: boolean;
  ratio: number;
  startHeight: number;
  startWidth: number;
  startX: number;
  startY: number;
}

interface Props {
  editor: Editor;
  imageRef: { current: null | HTMLElement };
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  keepRatio?: boolean;
  onResizeEnd: (width: number, height: number) => void;
  onResizeStart?: () => void;
}

export default function ImageResizer({
  editor,
  imageRef,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  keepRatio,
  onResizeEnd,
  onResizeStart,
}: Props) {
  const controlWrapperRef = useRef<HTMLDivElement>(null);

  const positioningRef = useRef<Positioning>({
    currentHeight: 0,
    currentWidth: 0,
    direction: 0,
    isResizing: false,
    ratio: 0,
    startHeight: 0,
    startWidth: 0,
    startX: 0,
    startY: 0,
  });

  const editorRootElement = editor.view.dom;

  const setStartCursor = (direction: number) => {
    const ew = direction === Direction.east || direction === Direction.west;
    const ns = direction === Direction.north || direction === Direction.south;
    const nwse =
      (direction & Direction.north && direction & Direction.west) ||
      (direction & Direction.south && direction & Direction.east);

    const cursorDir = ew ? 'ew' : ns ? 'ns' : nwse ? 'nwse' : 'nesw';

    if (editorRootElement !== null) {
      editorRootElement.style.setProperty(
        'cursor',
        `${cursorDir}-resize`,
        'important'
      );
    }
    if (document.body !== null) {
      document.body.style.setProperty(
        'cursor',
        `${cursorDir}-resize`,
        'important'
      );
      document.body.style.setProperty(
        '-webkit-user-select',
        `none`,
        'important'
      );
    }
  };

  const setEndCursor = () => {
    if (editorRootElement !== null) {
      editorRootElement.style.removeProperty('cursor');
    }
    if (document.body !== null) {
      document.body.style.removeProperty('cursor');
      document.body.style.removeProperty('-webkit-user-select');
    }
  };

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    direction: number
  ) => {
    if (!editor.isEditable) {
      return;
    }

    const image = imageRef.current;
    const controlWrapper = controlWrapperRef.current;

    if (image !== null && controlWrapper !== null) {
      event.preventDefault();
      const { width, height } = image.getBoundingClientRect();
      const positioning = positioningRef.current;
      positioning.startWidth = width;
      positioning.startHeight = height;
      positioning.ratio = width / height;
      positioning.currentWidth = width;
      positioning.currentHeight = height;
      positioning.startX = event.clientX;
      positioning.startY = event.clientY;
      positioning.isResizing = true;
      positioning.direction = direction;

      setStartCursor(direction);
      onResizeStart?.();

      controlWrapper.classList.add('image-control-wrapper--resizing');
      image.style.height = `${height}px`;
      image.style.width = `${width}px`;

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    }
  };

  const handlePointerMove = (event: PointerEvent) => {
    const image = imageRef.current;
    const positioning = positioningRef.current;

    const isHorizontal =
      positioning.direction & (Direction.east | Direction.west);
    const isVertical =
      positioning.direction & (Direction.south | Direction.north);

    if (image === null || !positioning.isResizing) {
      return;
    }

    if (keepRatio) {
      let width = 0;
      let height = 0;

      if (isHorizontal) {
        let diff = Math.floor(positioning.startX - event.clientX);
        diff = positioning.direction & Direction.east ? -diff : diff;

        width = clamp(positioning.startWidth + diff, minWidth, maxWidth);

        height = width / positioning.ratio;
      } else {
        let diff = Math.floor(positioning.startY - event.clientY);
        diff = positioning.direction & Direction.south ? -diff : diff;

        height = clamp(positioning.startHeight + diff, minHeight, maxHeight);

        width = height * positioning.ratio;
      }

      if (width < minWidth || width > maxWidth) {
        return;
      }

      if (height < minHeight || height > maxHeight) {
        return;
      }

      image.style.width = `${width}px`;
      image.style.height = `${height}px`;
      image.style.maxWidth = `${width}px`;

      positioning.currentHeight = height;
      positioning.currentWidth = width;
      return;
    }

    // Corner cursor
    if (isHorizontal && isVertical) {
      let diffWidth = Math.floor(positioning.startX - event.clientX);
      diffWidth =
        positioning.direction & Direction.east ? -diffWidth : diffWidth;

      let diffHeight = Math.floor(positioning.startY - event.clientY);
      diffHeight =
        positioning.direction & Direction.south ? -diffHeight : diffHeight;

      const width = clamp(
        positioning.startWidth + diffWidth,
        minWidth,
        maxWidth
      );

      const height = clamp(
        positioning.startHeight + diffHeight,
        minHeight,
        maxHeight
      );

      image.style.width = `${width}px`;
      image.style.height = `${height}px`;
      image.style.maxWidth = `${width}px`;

      positioning.currentHeight = height;
      positioning.currentWidth = width;
    } else if (isVertical) {
      let diff = Math.floor(positioning.startY - event.clientY);
      diff = positioning.direction & Direction.south ? -diff : diff;

      const height = clamp(
        positioning.startHeight + diff,
        minHeight,
        maxHeight
      );

      image.style.height = `${height}px`;
      positioning.currentHeight = height;
    } else {
      let diff = Math.floor(positioning.startX - event.clientX);
      diff = positioning.direction & Direction.east ? -diff : diff;

      const width = clamp(positioning.startWidth + diff, minWidth, maxWidth);

      image.style.width = `${width}px`;
      image.style.maxWidth = `${width}px`;
      positioning.currentWidth = width;
    }
  };

  const handlePointerUp = () => {
    const image = imageRef.current;
    const positioning = positioningRef.current;
    const controlWrapper = controlWrapperRef.current;
    if (image !== null && controlWrapper !== null && positioning.isResizing) {
      const width = positioning.currentWidth;
      const height = positioning.currentHeight;
      positioning.startWidth = 0;
      positioning.startHeight = 0;
      positioning.ratio = 0;
      positioning.startX = 0;
      positioning.startY = 0;
      positioning.currentWidth = 0;
      positioning.currentHeight = 0;
      positioning.isResizing = false;

      controlWrapper.classList.remove('image-control-wrapper--resizing');

      setEndCursor();
      onResizeEnd(width, height);

      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    }
  };

  return (
    <div ref={controlWrapperRef}>
      <div
        className='image-resizer image-resizer-n'
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.north);
        }}
      />
      <div
        className='image-resizer image-resizer-ne'
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.north | Direction.east);
        }}
      />
      <div
        className='image-resizer image-resizer-e'
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.east);
        }}
      />
      <div
        className='image-resizer image-resizer-se'
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.south | Direction.east);
        }}
      />
      <div
        className='image-resizer image-resizer-s'
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.south);
        }}
      />
      <div
        className='image-resizer image-resizer-sw'
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.south | Direction.west);
        }}
      />
      <div
        className='image-resizer image-resizer-w'
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.west);
        }}
      />
      <div
        className='image-resizer image-resizer-nw'
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.north | Direction.west);
        }}
      />
    </div>
  );
}
