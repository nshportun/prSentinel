import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["dist/index.js"],
    bundle: true,
    platform: "node",
    format: "cjs",
    outfile: "dist/index.bundled.cjs",
    external: ["@actions/core", "@actions/github"],
  })
  .catch(() => process.exit(1));
