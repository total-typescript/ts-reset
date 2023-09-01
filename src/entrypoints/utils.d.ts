declare namespace TSReset {
  type NonFalsy<T> = T extends false | 0 | "" | null | undefined | 0n
    ? never
    : T;

  type WidenLiteral<T> = T extends string
    ? string
    : T extends number
    ? number
    : T extends boolean
    ? boolean
    : T extends bigint
    ? bigint
    : T extends symbol
    ? symbol
    : T;

  // https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
  type IsAny<T> = 0 extends 1 & T ? true : false;
}
