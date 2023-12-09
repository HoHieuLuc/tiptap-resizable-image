import { Stack } from '@mantine/core';
import { CodeHighlightTabs, Heading } from '@/components';
import GettingStartedExample from '../getting-started/GettingStartedExample';
import classes from './GhostStyle.module.css';

const css = `.ghost > img {
  border: 1px solid red;
}`;

const GhostStyle = () => {
  return (
    <Stack className={classes.root}>
      <Heading order={2} label='Change ghost style' />
      <CodeHighlightTabs
        code={{ fileName: 'Demo.css', code: css, language: 'css' }}
      />
      <GettingStartedExample />
    </Stack>
  );
};
export default GhostStyle;
