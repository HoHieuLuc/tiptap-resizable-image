'use client';

import {
  CodeHighlightTabs as MCodeHighlightTabs,
  CodeHighlightTabsProps,
} from '@mantine/code-highlight';
import {
  IconFileTypeCss,
  IconFileTypeTsx,
  IconTerminal,
} from '@tabler/icons-react';

function getFileIcon(fileName: string) {
  if (fileName.endsWith('.tsx')) {
    return <IconFileTypeTsx size={18} />;
  }

  if (fileName.endsWith('.css')) {
    return <IconFileTypeCss size={18} />;
  }

  return <IconTerminal size={18} />;
}

const CodeHighlightTabs = (props: CodeHighlightTabsProps) => {
  const { code } = Array.isArray(props.code) ? props.code[0] : props.code;
  const defaultExpanded = code.split('\n').length <= 5;

  return (
    <MCodeHighlightTabs
      getFileIcon={getFileIcon}
      withExpandButton
      defaultExpanded={defaultExpanded}
      {...props}
    />
  );
};
export default CodeHighlightTabs;
