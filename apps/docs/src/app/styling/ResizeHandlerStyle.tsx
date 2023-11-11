import { Stack, Title } from '@mantine/core';
import GettingStartedExample from '../getting-started/GettingStartedExample';
import CodeHighlightTabs from '@/components/CodeHighlightTabs/CodeHighlightTabs';
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
      <Title order={2}>Change handler style</Title>
      <CodeHighlightTabs code={{ fileName: 'Demo.css', code: css, language: 'css' }} />
      <GettingStartedExample />
    </Stack>
  );
};
export default ResizeHandlerStyle;
