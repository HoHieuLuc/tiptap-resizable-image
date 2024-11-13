# tiptap-extension-resizable-image

## 1.0.5

### Patch Changes

- Fix image resizing to allow dimensions beyond original size ([#6](https://github.com/HoHieuLuc/tiptap-resizable-image/issues/6))

## 1.0.4

### Patch Changes

- Fix tsconfig error ([#5](https://github.com/HoHieuLuc/tiptap-resizable-image/pull/5))

## 1.0.3

### Patch Changes

- Fix caption line breaks not working correctly
- Prevent caption from overflowing outside of image

## 1.0.2

### Patch Changes

- fix minWidth, minHeight, maxWidth, maxHeight not working correctly

## 1.0.1

### Patch Changes

- Update readme

## 1.0.0

### Major Changes

- Replace react-moveable/Moveable component with custom ImageResizer component
- New options: `minHeight`, `maxHeight`, `minWidth`

**Breaking Changes**

- `moveableProps` is no longer available. If you want to hide certain handlers, use CSS instead (see: [Hide handlers](https://tiptap-resizable-image.vercel.app/styling#hide-handlers))

## 0.5.0

### Minor Changes

- Add image caption

## 0.4.0

### Minor Changes

- ResizableImageComponent: focus state is now based on ProseMirror-selectednode css class

**Breaking Changes**

- The `onContextMenu` payload no longer includes the `setFocused` function for controlling the focused state of the image

## 0.3.0

### Minor Changes

- Add allowBase64 option
- Add markdown syntax support

## 0.2.0

### Minor Changes

- Fix maxWidth not working correctly

## 0.1.2

### Patch Changes

- Add commands section to README

## 0.1.1

### Patch Changes

- Update README file

## 0.1.0

### Minor Changes

- First minor release
