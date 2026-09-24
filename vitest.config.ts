import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["**/__tests__/**/*.{ts,tsx}", "**/*.test.{ts,tsx}"],
    exclude: ["e2e/**", "node_modules/**", ".next/**", ".claude/**"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
      "@components": resolve(__dirname, "components"),
      "@hooks": resolve(__dirname, "hooks"),
      "@lib": resolve(__dirname, "lib"),
    },
  },
});
