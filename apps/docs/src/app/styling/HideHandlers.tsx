import { Stack } from '@mantine/core';
import { CodeHighlightTabs, Heading } from '@/components';
import GettingStartedExample from '../getting-started/GettingStartedExample';
import classes from './HideHandlers.module.css';

const css = `.image-resizer-n,
.image-resizer-e,
.image-resizer-s,
.image-resizer-w {
  visibility: hidden;
}`;

const HideHandlers = () => {
  return (
    <Stack className={classes.root}>
      <Heading order={2} label='Hide handlers' />
      <CodeHighlightTabs
        code={{ fileName: 'Demo.css', code: css, language: 'css' }}
      />
      <GettingStartedExample />
    </Stack>
  );
};
export default HideHandlers;
