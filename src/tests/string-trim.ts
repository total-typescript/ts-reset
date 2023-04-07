import { doNotExecute } from "./utils";

doNotExecute(async () => {
  const str = "\n\t\r moshe \r\t\n";

  function requireTrimmed<T extends string>(
    _: T extends `${Whitespace}${string}` | `${string}${Whitespace}`
      ? `Expected '${Trim<T>}', received '${T}'`
      : T,
  ) {}

  // @ts-expect-error
  requireTrimmed(str);
  // @ts-expect-error
  requireTrimmed(str.trimLeft());
  // @ts-expect-error
  requireTrimmed(str.trimStart());
  // @ts-expect-error
  requireTrimmed(str.trimRight());
  // @ts-expect-error
  requireTrimmed(str.trimEnd());

  requireTrimmed(str.trim());
});

doNotExecute(async () => {
  const str = "\n\t\r moshe \r\t\n";

  function requireTrimmedStart<T extends string>(
    _: T extends `${Whitespace}${string}`
      ? `Expected '${TrimStart<T>}', received '${T}'`
      : T,
  ) {}

  // @ts-expect-error
  requireTrimmedStart(str);
  // @ts-expect-error
  requireTrimmedStart(str.trimRight());
  // @ts-expect-error
  requireTrimmedStart(str.trimEnd());

  requireTrimmedStart(str.trimLeft());
  requireTrimmedStart(str.trimStart());
  requireTrimmedStart(str.trim());
});

doNotExecute(async () => {
  const str = "\n\t\r moshe \r\t\n";

  function requireTrimmedEnd<T extends string>(
    _: T extends `${string}${Whitespace}`
      ? `Expected '${TrimEnd<T>}', received '${T}'`
      : T,
  ) {}

  // @ts-expect-error
  requireTrimmedEnd(str);
  // @ts-expect-error
  requireTrimmedEnd(str.trimLeft());
  // @ts-expect-error
  requireTrimmedEnd(str.trimStart());

  requireTrimmedEnd(str.trimEnd());
  requireTrimmedEnd(str.trimRight());
  requireTrimmedEnd(str.trim());
});
