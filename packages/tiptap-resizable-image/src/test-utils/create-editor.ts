import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import ResizableImage from '../resizable-image';
import { ResizableImageOptions } from '../resizable-image.types';

interface CreateEditorProps {
  content?: string;
  resizableImageOptions?: Partial<ResizableImageOptions>;
}

export const createEditor = ({
  content,
  resizableImageOptions,
}: CreateEditorProps) => {
  return new Editor({
    extensions: [StarterKit, ResizableImage.configure(resizableImageOptions)],
    content,
  });
};
