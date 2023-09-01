import { doNotExecute, Equal, Expect } from "./utils";

doNotExecute(() => {
  const maybeArr = [1, 2, 3] as unknown;

  if (Array.isArray(maybeArr)) {
    type tests = [Expect<Equal<typeof maybeArr, unknown[]>>];
  }
});

doNotExecute(() => {
  const maybeArr = [1, 2, 3] as unknown[];

  if (Array.isArray(maybeArr)) {
    type tests = [Expect<Equal<typeof maybeArr, unknown[]>>];
  }
});

doNotExecute(() => {
  const maybeArr = [1, 2, 3] as any;

  if (Array.isArray(maybeArr)) {
    type tests = [Expect<Equal<typeof maybeArr, any[]>>];
  }
});

doNotExecute(() => {
  const maybeArr = [1, 2, 3] as any[];

  if (Array.isArray(maybeArr)) {
    type tests = [Expect<Equal<typeof maybeArr, any[]>>];
  }
});

doNotExecute(() => {
  const arrOrString = [] as string[] | string;

  if (Array.isArray(arrOrString)) {
    type tests = [Expect<Equal<typeof arrOrString, string[]>>];
  }
});

doNotExecute(() => {
  const arrOrString = [] as readonly string[] | string;

  if (Array.isArray(arrOrString)) {
    type tests = [Expect<Equal<typeof arrOrString, readonly string[]>>];
  }
});

doNotExecute(() => {
  const arrOrString = [] as readonly string[] | string[] | string;

  if (Array.isArray(arrOrString)) {
    type tests = [Expect<Equal<typeof arrOrString, readonly string[] | string[]>>];
  }
});

doNotExecute(() => {
  const arrOrString = [] as string[] | string;

  if (Array.isArray(arrOrString)) return;
  type tests = [Expect<Equal<typeof arrOrString, string>>];
});

doNotExecute(() => {
  const arrOrString = [] as readonly string[] | string;

  if (Array.isArray(arrOrString)) return;
  type tests = [Expect<Equal<typeof arrOrString, string>>];
});

doNotExecute(() => {
  const arrOrString = [] as readonly string[] | string[] | string;

  if (Array.isArray(arrOrString)) return;
  type tests = [Expect<Equal<typeof arrOrString, string>>];
});

doNotExecute(() => {
  let arrOrString = "" as string | [1, 2];

  if (Array.isArray(arrOrString)) {
    type tests = [Expect<Equal<typeof arrOrString, [1, 2]>>];
  }
});

doNotExecute(() => {
  let path = [] as string | string[];

  const paths = Array.isArray(path) ? path : [path];

  type tests = [Expect<Equal<typeof paths, string[]>>];
});

doNotExecute(() => {
  function test<T>(value: T) {
    type Unarray<T> = T extends Array<infer U> ? U : T;
    const inner = <X extends Unarray<T>>(v: X[]) => {};

    if (Array.isArray(value)) {
      inner(value);
    }
  }
});
