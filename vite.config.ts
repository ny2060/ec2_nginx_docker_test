import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2022",
    rollupOptions: {
      input: {
        main: "./index.html",
        "firebase-messaging-sw": "./src/firebase-messaging-sw.js",
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === "firebase-messaging-sw"
            ? "[name].js" // Output service worker in root
            : "assets/[name]-[hash].js"; // Others in `assets/`
        },
      },
    },
  },
});
