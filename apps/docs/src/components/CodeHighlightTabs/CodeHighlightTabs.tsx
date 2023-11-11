import {
  CodeHighlightTabs as MCodeHighlightTabs,
  CodeHighlightTabsProps,
} from '@mantine/code-highlight';

const CodeHighlightTabs = (props: CodeHighlightTabsProps) => {
  return <MCodeHighlightTabs withExpandButton {...props} />;
};
export default CodeHighlightTabs;
