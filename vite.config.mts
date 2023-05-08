import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// import 'npm:react@^18.2.0';
// import 'npm:react-dom@^18.2.0/client';

//  Don't use https://esm.sh/ and https://deno.land/x as import 'https://deno.land/x/zod@v3.21.4/mod.ts';
// Because of using as it returns unexpected MIME type :<
// And https://github.com/vitejs/vite/discussions/9332#discussioncomment-3285222 did NOT resolve it
//
// So needed to specify as below  with `Import Maps`.
// import 'npm:zod@^3.21.4';
// Do not directly specify at here for both using in test and vite

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
