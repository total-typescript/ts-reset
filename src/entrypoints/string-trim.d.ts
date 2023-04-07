/// <reference path="utils.d.ts" />

interface String {
  trim<T extends string>(this: T): Trim<T>;
  trimEnd<T extends string>(this: T): TrimEnd<T>;
  /**
   * Removes the leading white space and line terminator characters from a string.
   * @deprecated A legacy feature for browser compatibility. Use `trimStart` instead
   */
  trimLeft<T extends string>(this: T): TrimStart<T>;
  /**
   * Removes the trailing white space and line terminator characters from a string.
   * @deprecated A legacy feature for browser compatibility. Use `trimEnd` instead
   */
  trimRight<T extends string>(this: T): TrimEnd<T>;
  trimStart<T extends string>(this: T): TrimStart<T>;
}

type Trim<T extends string> =
  T extends `${Whitespace}${infer Middle}${Whitespace}`
    ? Trim<Middle>
    : T extends `${Whitespace}${infer Middle}`
    ? TrimStart<Middle>
    : T extends `${infer Middle}${Whitespace}`
    ? TrimEnd<Middle>
    : T;

type TrimStart<T extends string> = T extends `${Whitespace}${infer Right}`
  ? TrimStart<Right>
  : T;

type TrimEnd<T extends string> = T extends `${infer Left}${Whitespace}`
  ? TrimEnd<Left>
  : T;

type Whitespace = " " | "\t" | "\n" | "\r";
