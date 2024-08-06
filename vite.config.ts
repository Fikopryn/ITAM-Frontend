import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 3000,
  },
  server: {
    port: 8090,
    proxy: {
      // prod
      // "/proxyrestr3": {
      //   target: "http://phikpwls01.phss-pertamina.com:7005",
      //   changeOrigin: true,
      //   secure: false,
      //   ws: true,
      // },
      // "/r3-oauth": {
      //   target: "http://vicosun21.phss-pertamina.com",
      //   changeOrigin: true,
      //   secure: false,
      //   ws: true,
      // },

      // dev
      "/proxyrestr3": {
        target: "http://10.254.201.133:7005",
        changeOrigin: true,
        // secure: false,
        // ws: true,
      },
      "/r3-oauth": {
        target: "http://10.254.201.133",
        changeOrigin: true,
        // secure: false,
        // ws: true,
      },
    },
  },
});
