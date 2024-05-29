import { doNotExecute, Equal, Expect } from "./utils";

doNotExecute(() => {
  const arr = [1, 2, 3, undefined];

  if (arr.every(Boolean)) {
    type tests = [Expect<Equal<typeof arr, number[]>>];
  } else {
    type tests = [Expect<Equal<typeof arr, (number | undefined)[]>>];
  }
});

doNotExecute(() => {
  const arr = [1, 2, 3, "four"];

  if (arr.every(Boolean)) {
    type tests = [Expect<Equal<typeof arr, (number | string)[]>>];
  } else {
    type tests = [Expect<Equal<typeof arr, never>>];
  }
});

doNotExecute(() => {
  const arr = ["1", "2"] as const;

  if (arr.every(Boolean)) {
    type tests = [Expect<Equal<typeof arr, readonly ["1", "2"]>>];
  } else {
    type tests = [Expect<Equal<typeof arr, never>>];
  }
});

doNotExecute(() => {
  const arr = ["1", "2", undefined] as const;

  if (arr.every(Boolean)) {
    type tests = [Expect<Equal<typeof arr, never>>];
  } else {
    type tests = [Expect<Equal<typeof arr, readonly ["1", "2", undefined]>>];
  }
});

doNotExecute(() => {
  const arr = [0, null, undefined, false, ""] as const;

  if (arr.every(Boolean)) {
    type tests = [Expect<Equal<typeof arr, never>>];
  } else {
    type tests = [
      Expect<Equal<typeof arr, readonly [0, null, undefined, false, ""]>>,
    ];
  }
});

doNotExecute(() => {
  const arr: (0 | null | undefined | false | "" | 0n)[] = [
    0,
    null,
    undefined,
    false,
    "",
    0n,
  ];

  if (arr.every(Boolean)) {
    type tests = [Expect<Equal<typeof arr, never[]>>];
  } else {
    type tests = [
      Expect<Equal<typeof arr, (0 | null | undefined | false | "" | 0n)[]>>,
    ];
  }
});
