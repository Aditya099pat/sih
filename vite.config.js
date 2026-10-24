import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { app } from "./backend/server.js";

function expressApiPlugin() {
  return {
    name: "express-api-plugin",
    configureServer(server) {
      server.middlewares.use(app);
    }
  };
}

export default defineConfig(() => {
  return {
    root: "frontend",
    plugins: [
      expressApiPlugin(),
      tailwindcss(),
      react()
    ],
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(import.meta.dirname, "./frontend/src") },
        { find: "@data", replacement: path.resolve(import.meta.dirname, "./data") },
        { find: "@backend", replacement: path.resolve(import.meta.dirname, "./backend") },
        { find: /.*\/data\/mockData(\.js)?$/, replacement: path.resolve(import.meta.dirname, "./data/mockData.js") },
        { find: /.*\/data\/store(\.js)?$/, replacement: path.resolve(import.meta.dirname, "./data/store.js") }
      ]
    },
    server: {
      port: 3000,
      host: "0.0.0.0",
      fs: {
        allow: [".."]
      },
      hmr: process.env.DISABLE_HMR !== "true",
      watch: process.env.DISABLE_HMR === "true" ? null : {}
    },
    build: {
      outDir: "../dist",
      emptyOutDir: true
    }
  };
});
