import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [
    react(),
  ],
  base: '/alpha-test',
});

// https://github.com/pavelkhrustalyov/alpha-test
// https://pavelkhrustalyov.github.io/alpha-test