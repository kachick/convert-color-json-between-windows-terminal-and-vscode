import { defineConfig } from 'npm:vite@^4.3.5';
import react from 'npm:@vitejs/plugin-react@^4.0.0';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
