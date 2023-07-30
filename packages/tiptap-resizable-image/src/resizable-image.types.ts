import { Attribute } from '@tiptap/core';
import { NodeViewRendererProps } from '@tiptap/react';

export interface ResizableImageOptions {
  HTMLAttributes: Record<string, unknown>;
  defaultWidth: number;
  defaultHeight: number;
  maxWidth: number;
  maxHeight: number;
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
