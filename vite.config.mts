import { defineConfig } from "npm:vite@4.4.4";
import viteReact from "npm:@vitejs/plugin-react@4.0.3";

// https://vitejs.dev/config/
export default defineConfig({
  // Type check is failing in *.mts and `viteReact()`. `viteReact.default()` will pass, but actually not work
  plugins: [viteReact()],
});
