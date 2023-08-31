import * as fs from "fs";
import * as path from "path";

import { readdirRecursive } from "./util";

const packageJsonContents = fs.readFileSync(
  path.join(__dirname, "../", "package.json"),
  "utf8",
);

const packageJson = JSON.parse(packageJsonContents) as {
  exports: Record<string, any>;
};

const pkgJsonExports = Object.keys(packageJson.exports).filter((entrypoint) => {
  return entrypoint !== "."; // ignore the root entrypoint
});

const root = path.join(__dirname, "../src/entrypoints");
const entrypointFiles = readdirRecursive.sync(root).map((file) => {
  return file.replace(".d.ts", "");
});

for (const entrypointFile of entrypointFiles) {
  const unixBasedEntrypointFile = entrypointFile.replace(/\\/g, "/");
  if (!pkgJsonExports.includes(`./${unixBasedEntrypointFile}`)) {
    console.error(
      `Missing export file in package.json for ./src/entrypoints/${unixBasedEntrypointFile}.ts`,
    );

    process.exit(1);
  }
}
