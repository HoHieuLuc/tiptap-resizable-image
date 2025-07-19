import { Stack } from '@mantine/core';
import { CodeHighlightTabs, Heading } from '@/components';
import GettingStartedExample from '../getting-started/GettingStartedExample';
import classes from './ResizeHandlerStyle.module.css';

const css = `.image-component {
  --box-color: red;
}
.image-component .image-resizer {
  border-radius: 0;
}`;

const ResizeHandlerStyle = () => {
  return (
    <Stack className={classes.root}>
      <Heading order={2} label='Change handler style' />
      <CodeHighlightTabs
        code={{ fileName: 'Demo.css', code: css, language: 'css' }}
      />
      <GettingStartedExample />
    </Stack>
  );
};
export default ResizeHandlerStyle;
