import { Stack, Title } from '@mantine/core';
import GettingStartedExample from '../getting-started/GettingStartedExample';
import classes from './GhostStyle.module.css';
import CodeHighlightTabs from '@/components/CodeHighlightTabs/CodeHighlightTabs';

const css = `.ghost > img {
  border: 1px solid red;
}`;

const GhostStyle = () => {
  return (
    <Stack className={classes.root}>
      <Title order={2}>Change ghost style</Title>
      <CodeHighlightTabs
        code={{ fileName: 'Demo.css', code: css, language: 'css' }}
      />
      <GettingStartedExample />
    </Stack>
  );
};
export default GhostStyle;
