import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['jest-prosemirror/environment', 'vitest.setup.ts'],
  },
});
