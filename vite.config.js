import { defineConfig, loadEnv } from "vite";
import postcss from "./postcss.config.js";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: {
      port: 8080,
    },
    define: {
      "process.env": { ...process.env, ...loadEnv(mode, process.cwd()) },
    },
    css: {
      postcss,
    },
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: /^~.+/,
          replacement: (val) => {
            return val.replace(/^~/, "");
          },
        },
      ],
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: false,
      },
    },
  });
};
