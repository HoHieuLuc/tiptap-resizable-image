import { Attribute, Editor } from '@tiptap/core';
import { NodeViewRendererProps } from '@tiptap/react';
import { ScalableProps } from 'react-moveable';

export interface ResizableImageOptions {
  HTMLAttributes: Record<string, unknown>;
  defaultWidth: number;
  defaultHeight: number;
  maxWidth: number;
  maxHeight: number;
  /** Override default moveable props */
  moveableProps?: Omit<ScalableProps, 'target' | 'onScale' | 'onScaleEnd'>;
  /** Handle uploading when pasting and dropping image into the editor */
  onUpload?: (file: File, editor: Editor) => Promise<void>;
  onContextMenu?: (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
    payload: {
      /** Control the focused state of the image */
      setFocused: (value: React.SetStateAction<boolean>) => void,
    } & ResizableImageNodeViewRenderedProps,
  ) => void;
}

export interface ResizableImageHTMLAttributes {
  src: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
  'data-keep-ratio'?: boolean;
  className?: string;
}

export type ResizableImageAttributes = Record<keyof ResizableImageHTMLAttributes, Attribute> | object;

type Node = NodeViewRendererProps['node'] & {
  attrs: ResizableImageHTMLAttributes;
};

type NodeViewRendererPropsExtension = NodeViewRendererProps['extension'];

interface Extension extends NodeViewRendererPropsExtension {
  options: ResizableImageOptions;
}

export interface ResizableImageNodeViewRenderedProps extends NodeViewRendererProps {
  updateAttributes(attrs: Partial<ResizableImageHTMLAttributes>): void;
  node: Node;
  extension: Extension;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageComponent: {
      setResizableImage(attrs: ResizableImageHTMLAttributes, position?: number): ReturnType;
    }
  }
}
