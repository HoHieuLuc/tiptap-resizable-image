import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Stack, Title } from '@mantine/core';
import GettingStartedExample from '../getting-started/GettingStartedExample';
import classes from './GhostStyle.module.css';

const cssCode = `.ghost > img {
  border: 1px solid red;
}`;

const GhostStyle = () => {
  return (
    <Stack className={classes.root}>
      <Title order={2}>Change ghost style</Title>
      <CodeHighlightTabs
        code={{ fileName: 'Demo.css', code: cssCode, language: 'css' }}
      />
      <GettingStartedExample />
    </Stack>
  );
};
export default GhostStyle;
