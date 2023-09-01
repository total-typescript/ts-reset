import { doNotExecute, Equal, Expect } from "./utils";

doNotExecute(async () => {
  const arr = ["1", "2", "3"] as const;

  // Look ma, no error!
  arr.includes("4");

  // Look ma, proper errors!
  arr.includes(
    // @ts-expect-error
    2,
  );
  arr.includes(
    // @ts-expect-error
    true,
  );
});

doNotExecute(async () => {
  const arr = [1, 2, 3] as const;

  arr.includes(4);
  arr.includes(
    // @ts-expect-error
    true,
  );
  arr.includes(
    // @ts-expect-error
    "str",
  );
});

doNotExecute(async () => {
  const arr = [
    { a: 1 },
    {
      a: 2,
    },
    {
      a: 3,
    },
  ] as const;

  arr.includes(
    // @ts-expect-error
    4,
  );

  arr.includes({ a: 1 });
});

doNotExecute(async () => {
  const arr: Array<"1" | "2" | "3"> = ["1", "2", "3"];

  arr.includes("4");

  arr.includes(
    // @ts-expect-error
    2,
  );
  arr.includes(
    // @ts-expect-error
    true,
  );
});

doNotExecute(async () => {
  // All entries are well known => value is narrowed
  const options = [1, 2, 3] as readonly [1, 2, 3];
  const value = 2 as 2 | 3 | 4 | 5;

  if (options.includes(value)) {
    type tests = [Expect<Equal<typeof value, 2 | 3>>];
  } else {
    type tests = [Expect<Equal<typeof value, 4 | 5>>];
  }
});

doNotExecute(async () => {
  // Entries are not well known => value is not narrowed
  const options = [1, 2, 3] as readonly number[];
  const value = 2 as 2 | 3 | 4 | 5;

  if (options.includes(value)) {
    type tests = [Expect<Equal<typeof value, 2 | 3 | 4 | 5>>];
  } else {
    type tests = [Expect<Equal<typeof value, 2 | 3 | 4 | 5>>];
  }
});

doNotExecute(async () => {
  // Entries are not well known => value is not narrowed
  const options = [1, 2, 3] as number[];
  const value = 2 as 2 | 3 | 4 | 5;

  if (options.includes(value)) {
    type tests = [Expect<Equal<typeof value, 2 | 3 | 4 | 5>>];
  } else {
    type tests = [Expect<Equal<typeof value, 2 | 3 | 4 | 5>>];
  }
});

doNotExecute(async () => {
  // Entries are not well known => value is not narrowed
  const options = [] as readonly 1[];
  const value = 1 as 1 | 2;

  if (options.includes(value)) {
    type tests = [Expect<Equal<typeof value, 1 | 2>>];
  } else {
    type tests = [Expect<Equal<typeof value, 1 | 2>>];
  }
});

doNotExecute(async () => {
  // Entries are not well known => value is not narrowed
  const options = [] as 1[];
  const value = 1 as 1 | 2;

  if (options.includes(value)) {
    type tests = [Expect<Equal<typeof value, 1 | 2>>];
  } else {
    type tests = [Expect<Equal<typeof value, 1 | 2>>];
  }
});

doNotExecute(async () => {
  // Some entries are well known, others not => value is not narrowed
  const options = [1, 2, 3] as readonly [1, 2, 3 | 4];
  const value = 2 as 2 | 3 | 4 | 5;

  if (options.includes(value)) {
    type tests = [Expect<Equal<typeof value, 2 | 3 | 4 | 5>>];
  } else {
    type tests = [Expect<Equal<typeof value, 2 | 3 | 4 | 5>>];
  }
});

doNotExecute(async () => {
  // Some entries are well known, others not => value is not narrowed
  const options = [1, 2, 3] as [1, 2, 3 | 4];
  const value = 2 as 2 | 3 | 4 | 5;

  if (options.includes(value)) {
    type tests = [Expect<Equal<typeof value, 2 | 3 | 4 | 5>>];
  } else {
    type tests = [Expect<Equal<typeof value, 2 | 3 | 4 | 5>>];
  }
});

doNotExecute(async () => {
  // Union of arrays with well known entries => value is narrowed
  const options = [1, 2, 3] as readonly [1, 2, 3] | readonly [1, 2, 4];
  const value = 2 as 2 | 3 | 4 | 5;

  if (options.includes(value)) {
    // @ts-expect-error: Typescript limitation. TODO: fix when possible
    type tests = [Expect<Equal<typeof value, 2 | 3 | 4 | 5>>];
  } else {
    // @ts-expect-error: Typescript limitation. TODO: fix when possible
    type tests = [Expect<Equal<typeof value, 2 | 3 | 4 | 5>>];
  }
});

doNotExecute(async () => {
  // Union of arrays with well known entries => value is narrowed
  const options = [1, 2, 3] as [1, 2, 3] | [1, 2, 4];
  const value = 2 as 2 | 3 | 4 | 5;

  if (options.includes(value)) {
    // @ts-expect-error: Typescript limitation. TODO: fix when possible
    type tests = [Expect<Equal<typeof value, 2 | 3 | 4 | 5>>];
  } else {
    // @ts-expect-error: Typescript limitation. TODO: fix when possible
    type tests = [Expect<Equal<typeof value, 2 | 3 | 4 | 5>>];
  }
});
