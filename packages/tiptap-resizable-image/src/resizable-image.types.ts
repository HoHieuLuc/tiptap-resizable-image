import { Attribute, Range } from '@tiptap/core';
import { NodeViewRendererProps } from '@tiptap/react';
import { ScalableProps } from 'react-moveable';

/**
 * ResizableImage extension options.
 */
export interface ResizableImageOptions {
  /** HTML attributes for the resizable image. */
  HTMLAttributes: Record<string, unknown>;
  /** Allow base 64 as src. */
  allowBase64: boolean;
  /** Default width of the image element. */
  defaultWidth: number;
  /** Default height of the image element. */
  defaultHeight: number;
  /** Max width of the image element. */
  maxWidth: number;
  /** Optional moveable props to override defaults. */
  moveableProps?: Omit<ScalableProps, 'target' | 'scalable' | 'onScale' | 'onScaleEnd'>;
  /** Optional function to handle uploading when pasting and dropping image into the editor. */
  onUpload?: (file: File) => Promise<ResizableImageHTMLAttributes>;
  /** Optional function to handle context menu events. */
  onContextMenu?: (
    /** The React mouse event. */
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
    /** The payload for the context menu event. */
    payload: {
      /** Function to control the focused state of the image. */
      setFocused: (value: React.SetStateAction<boolean>) => void,
    } & ResizableImageNodeViewRendererProps,
  ) => void;
}

/**
 * HTML attributes of the image element.
 */
export interface ResizableImageHTMLAttributes {
  /** The source URL of the image. */
  src: string;
  /** Alternate text for the image. */
  alt?: string;
  /** The title of the image. */
  title?: string;
  /** The width of the image. */
  width?: number;
  /** The height of the image. */
  height?: number;
  /** Whether to keep the original aspect ratio of the image. */
  'data-keep-ratio'?: boolean;
  /** CSS class names for the image element. */
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

export interface ResizableImageNodeViewRendererProps extends NodeViewRendererProps {
  updateAttributes(attrs: Partial<ResizableImageHTMLAttributes>): void;
  node: Node;
  extension: Extension;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageComponent: {
      setResizableImage(attrs: ResizableImageHTMLAttributes, position?: number | Range): ReturnType;
    }
  }
}
