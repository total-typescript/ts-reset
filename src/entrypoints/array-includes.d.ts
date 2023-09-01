/// <reference path="utils.d.ts" />

type NarrowArrayElement<T, Found = never> = TSReset.IsUnion<T> extends true
  ? never
  : T extends readonly [infer A, ...infer B]
  ? TSReset.IsStrictLiteral<A> extends true
    ? NarrowArrayElement<B, Found | A>
    : never
  : Found;

interface ReadonlyArray<T> {
  includes(
    searchElement: [NarrowArrayElement<this>] extends [never]
      ? never
      : T | (TSReset.WidenLiteral<T> & {}),
    fromIndex?: number,
  ): searchElement is NarrowArrayElement<this>;

  includes(
    searchElement: T | (TSReset.WidenLiteral<T> & {}),
    fromIndex?: number,
  ): boolean;
}

interface Array<T> {
  includes(
    searchElement: [NarrowArrayElement<this>] extends [never]
      ? never
      : T | (TSReset.WidenLiteral<T> & {}),
    fromIndex?: number,
  ): searchElement is NarrowArrayElement<this>;

  includes(
    searchElement: T | (TSReset.WidenLiteral<T> & {}),
    fromIndex?: number,
  ): boolean;
}
