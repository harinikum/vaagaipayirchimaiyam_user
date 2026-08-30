import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: 'http://localhsot',
  server: {
    port: 3000,
    open: true,
    watch: {
      usePolling: true,
    },
  },
});
