import * as fs from "fs/promises";
import * as path from "path";
// import pkgJson from "../package.json";

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
  try {
    await fs.mkdir(distDir);
  } catch (e) {}

  const entrypoints = await fs.readdir(entrypointDir);

  for (const entrypoint of entrypoints) {
    const entrypointBase = entrypoint.replace(".d.ts", "");
    // const unixBasedEntrypointBase = entrypointBase.replace(/[\\/]/g, "/");

    await Promise.all([

      // exports[`./${path.dirname(unixBasedEntrypointBase)}`] = {
      //   types: `./dist/index.d.ts`,
      //   import: `./dist/index.mjs`,
      //   default: `./dist/index.js`,
      // };
      fs.writeFile(path.join(distDir, `${entrypointBase}.js`), ""),
      fs.writeFile(path.join(distDir, `${entrypointBase}.mjs`), ""),
      fs.copyFile(
        path.join(entrypointDir, entrypoint),
        path.join(distDir, `${entrypointBase}.d.ts`),
      ),
    ]);

    // exports[`./${unixBasedEntrypointBase}`] = {
    //   types: `./dist/${unixBasedEntrypointBase}.d.ts`,
    //   import: `./dist/${unixBasedEntrypointBase}.mjs`,
    //   default: `./dist/${unixBasedEntrypointBase}.js`,
    // };
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
