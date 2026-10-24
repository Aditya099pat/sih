import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { app } from "./server.js";

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
    plugins: [
      expressApiPlugin(),
      tailwindcss(),
      react()
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, ".")
      }
    },
    server: {
      hmr: process.env.DISABLE_HMR !== "true",
      watch: process.env.DISABLE_HMR === "true" ? null : {}
    }
  };
});

