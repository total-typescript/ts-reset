import * as fs from "fs/promises";
import * as path from "path";
// import pkgJson from "../package.json";

import { readdirRecursive } from "./util";

// interface Export {
//   types: string;
//   import: string;
//   default: string;
// }
// type Exports = Record<string, string | Export>;

const entrypointDir = path.join(__dirname, "../", "src", "entrypoints");
const distDir = path.join(__dirname, "../", "dist");

// const exports: Exports = {
//   "./package.json": "./package.json",
//   ".": {
//     types: "./dist/recommended.d.ts",
//     import: "./dist/recommended.mjs",
//     default: "./dist/recommended.js",
//   },
// };

const run = async () => {
  const entrypoints = await readdirRecursive(entrypointDir);
  const exportedDirectories = new Set<string>();

  for (const entrypoint of entrypoints) {
    const entrypointBase = entrypoint.replace(".d.ts", "");
    // const unixBasedEntrypointBase = entrypointBase.replace(/[\\/]/g, "/");
    const finalFilePath = path.resolve(distDir, entrypointBase);
    const finalDir = path.dirname(finalFilePath);
    const promises: Promise<unknown>[] = [];

    if (!exportedDirectories.has(finalDir) && finalDir !== distDir) {
      await fs.mkdir(finalDir, { recursive: true });
      const files = await fs.readdir(
        path.join(entrypointDir, path.dirname(entrypoint)),
      );

      promises.push(
        fs.writeFile(
          path.join(finalDir, "index.d.ts"),
          files.map((file) => `/// <reference path="./${file}" />`).join("\n"),
        ),
        fs.writeFile(
          path.join(finalDir, "index.js"),
          files.map((file) => `require("./${file}");`).join("\n"),
        ),
        fs.writeFile(
          path.join(finalDir, "index.mjs"),
          files.map((file) => `import "./${file}";`).join("\n"),
        ),
      );

      // exports[`./${path.dirname(unixBasedEntrypointBase)}`] = {
      //   types: `./dist/${path.dirname(unixBasedEntrypointBase)}/index.d.ts`,
      //   import: `./dist/${path.dirname(unixBasedEntrypointBase)}/index.mjs`,
      //   default: `./dist/${path.dirname(unixBasedEntrypointBase)}/index.js`,
      // };
      exportedDirectories.add(finalDir);
    }

    promises.push(
      fs.writeFile(path.join(distDir, `${entrypointBase}.js`), ""),
      fs.writeFile(path.join(distDir, `${entrypointBase}.mjs`), ""),
      fs.copyFile(
        path.resolve(entrypointDir, entrypoint),
        path.resolve(distDir, `${entrypointBase}.d.ts`),
      ),
    );

    // exports[`./${unixBasedEntrypointBase}`] = {
    //   types: `./dist/${unixBasedEntrypointBase}.d.ts`,
    //   import: `./dist/${unixBasedEntrypointBase}.mjs`,
    //   default: `./dist/${unixBasedEntrypointBase}.js`,
    // };

    await Promise.all(promises);
  }

  // pkgJson.exports = exports as typeof pkgJson.exports;
  // await fs.writeFile(
  //   path.join(__dirname, "../", "package.json"),
  //   JSON.stringify(pkgJson, null, 2),
  // );
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
