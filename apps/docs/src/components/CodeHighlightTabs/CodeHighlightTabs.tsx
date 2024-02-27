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
  return (
    <MCodeHighlightTabs
      getFileIcon={getFileIcon}
      withExpandButton
      defaultExpanded={false}
      {...props}
    />
  );
};
export default CodeHighlightTabs;
