import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    reactRouter(),
    {
      name: 'remix-manifest-resolver',
      resolveId(id) {
        if (id === 'remix:manifest') {
          return id;
        }
      },
      // Optional: warning is suppressed without this hook
      // Provides an empty object for 'remix:manifest' if HMR triggers, but HMR remains non-functional
      load(id) {
        if (id === 'remix:manifest') {
          return 'export default {}';
        }
      },
    },
    tsconfigPaths(),
  ],
});
