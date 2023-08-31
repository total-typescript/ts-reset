/// <reference path="utils.d.ts" />

interface Set<T> {
  has(value: T | (TSReset.WidenLiteral<T> & {})): value is T;
}

interface ReadonlySet<T> {
  has(value: T | (TSReset.WidenLiteral<T> & {})): value is T;
}
