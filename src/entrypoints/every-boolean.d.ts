/// <reference path="utils.d.ts" />

interface Array<T> {
  every<S extends T>(
    predicate: BooleanConstructor,
    thisArg?: any,
  ): this is this extends S[]
    ? TSReset.NonFalsy<S>[]
    : this[number] extends TSReset.NonFalsy<S>
    ? this
    : never;
}

interface ReadonlyArray<T> {
  every<S extends T>(
    predicate: BooleanConstructor,
    thisArg?: any,
  ): this is this extends S[]
    ? TSReset.NonFalsy<S>[]
    : this[number] extends TSReset.NonFalsy<S>
    ? this
    : never;
}
