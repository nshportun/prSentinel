import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.ts"],
      exclude: [
        "src/**/*.test.ts",
        "src/**/index.ts",
        "src/index.ts",
        "src/providers/AnthropicProvider.ts",
        "src/providers/BedrockProvider.ts",
        "src/checks/PIIDetectionCheck.ts",
        "src/checks/SchemaDriftCheck.ts",
        "src/diff/DiffFetcher.ts",
      ],
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 85,
        statements: 85,
      },
    },
  },
});
