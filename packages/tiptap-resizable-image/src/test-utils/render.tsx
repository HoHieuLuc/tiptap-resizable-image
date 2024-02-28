import { render as testingLibraryRender } from '@testing-library/react';

export function render(ui: React.ReactNode): ReturnType<typeof testingLibraryRender> {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  });
}
