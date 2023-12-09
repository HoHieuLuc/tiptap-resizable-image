import { Stack } from '@mantine/core';
import { CodeHighlightTabs, Heading } from '@/components';
import GettingStartedExample from '../getting-started/GettingStartedExample';
import classes from './ResizeHandlerStyle.module.css';

const css = `.moveable-control.moveable-direction {
  background-color: red;
  border-radius: 0;
}
.moveable-line.moveable-direction {
  background-color: red;
  height: 3px;
}`;

const ResizeHandlerStyle = async () => {
  return (
    <Stack className={classes.root}>
      <Heading order={2} label='Change handler style' />
      <CodeHighlightTabs code={{ fileName: 'Demo.css', code: css, language: 'css' }} />
      <GettingStartedExample />
    </Stack>
  );
};
export default ResizeHandlerStyle;
