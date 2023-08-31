import * as fs from "fs";
import * as fsPromises from "fs/promises";
import * as path from "path";

interface ReaddirRecursiveOptions {
  absolute?: boolean;
  root?: string;
}

export const readdirRecursive = async (
  dir: string,
  options?: ReaddirRecursiveOptions,
): Promise<string[]> => {
  const { absolute = false, root = dir } = options ?? {};

  const files: string[] = [];
  const entries = await fsPromises.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subDir = await readdirRecursive(path.join(dir, entry.name), {
        ...options,
        root: dir,
      });
      files.push(...subDir);
    } else {
      files.push(
        absolute
          ? path.join(dir, entry.name)
          : path.join(dir, entry.name).replace(path.join(root, "/"), ""),
      );
    }
  }

  return files;
};

readdirRecursive.sync = (
  dir: string,
  options?: ReaddirRecursiveOptions,
): string[] => {
  const { absolute = false, root = dir } = options ?? {};
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subDir = readdirRecursive.sync(path.join(dir, entry.name), {
        ...options,
        root: dir,
      });
      files.push(...subDir);
    } else {
      files.push(
        absolute
          ? path.join(dir, entry.name)
          : path.join(dir, entry.name).replace(path.join(root, "/"), ""),
      );
    }
  }

  return files;
};
