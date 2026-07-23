import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["dist/index.js"],
    bundle: true,
    platform: "node",
    outfile: "dist/index.bundled.js",
    external: ["@actions/core", "@actions/github"],
  })
  .catch(() => process.exit(1));
