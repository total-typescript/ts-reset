import { doNotExecute, Equal, Expect } from "./utils";

doNotExecute(() => {
  const result = JSON.stringify(undefined);
  type tests = [Expect<Equal<typeof result, undefined>>];
});

doNotExecute(() => {
  // A function is treated as undefined by the JSON serializer
  const fn = () => {};
  const result = JSON.stringify(fn);
  type tests = [Expect<Equal<typeof result, undefined>>];
});

doNotExecute(() => {
  // If the incoming value can possibly be undefined then the return type can
  // possibly be undefined
  const result = JSON.stringify(5 as undefined | number);
  type tests = [Expect<Equal<typeof result, string | undefined>>];
});

doNotExecute(() => {
  // If the incoming value can possibly be a function then the return type can
  // possibly be undefined
  const result = JSON.stringify(5 as number | (() => number));
  type tests = [Expect<Equal<typeof result, string | undefined>>];
});

doNotExecute(() => {
  // If the type of the incoming value is `any` we can't assume anything about
  // it so return the broadest possible type
  const result = JSON.stringify(undefined as any);
  type tests = [Expect<Equal<typeof result, string | undefined>>];
});

doNotExecute(() => {
  // If the type of the incoming value is `unknown` we can't assume anything
  // about it so return the broadest possible type
  const result = JSON.stringify(undefined as unknown);
  type tests = [Expect<Equal<typeof result, string | undefined>>];
});

doNotExecute(() => {
  // If the type of the incoming value is "non-nullish" we can be sure it's not
  // undefined, but we can't be sure it isn't a function (treated as undefined)
  // so return the broadest possible type.
  const fn = () => {};
  const result = JSON.stringify(fn as Object);
  type tests = [Expect<Equal<typeof result, string | undefined>>];
});

doNotExecute(() => {
  // If the type of the incoming value contains "object" (meaning non-primitive)
  // we can't be sure it isn't a function (treated as undefined) so return the
  // broadest possible type.
  const value = null as null | string | number | boolean | object;
  const result = JSON.stringify(value);
  type tests = [Expect<Equal<typeof result, string | undefined>>];
});

doNotExecute(() => {
  // If the type of the incoming value contains "Record<K, any>" (in which K is
  // any valid index type, e.g. string or symbol) we can't be sure it isn't a
  // function so return the broadest possible type.
  const value = null as null | string | Record<string, any>;
  const result = JSON.stringify(value);
  type tests = [Expect<Equal<typeof result, string | undefined>>];
});

doNotExecute(() => {
  const value = null as null | string | Record<string, unknown> | any[];
  const result = JSON.stringify(value);
  type tests = [Expect<Equal<typeof result, string>>];
});
