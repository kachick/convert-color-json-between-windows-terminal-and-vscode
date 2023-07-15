import { defineConfig } from 'npm:vite@^4.4.4';
import react from 'npm:@vitejs/plugin-react@^4.0.3';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
