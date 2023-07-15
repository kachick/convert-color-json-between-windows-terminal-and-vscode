import { defineConfig } from 'npm:vite@^4.4.4';
import viteReact from 'npm:@vitejs/plugin-react@^4.0.3';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteReact.default()],
});
