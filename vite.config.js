import { defineConfig } from "vite"

export default defineConfig({
  define: {
    "process.env": {},
  },
  server: {
    host: "0.0.0.0",
  },
  test: {
    globals: true,
    environment: "jsdom",
    testIdAttribute: "id",
  },
  build: {
    outDir: "docs",
  },
  // Change this to your repo name
  base: "/template-npm/",
})
