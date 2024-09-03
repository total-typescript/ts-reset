import { doNotExecute, Equal, Expect } from "./utils";

doNotExecute(() => {
  const result = JSON.stringify({});

  type tests = [Expect<Equal<typeof result, string>>];
});

doNotExecute(() => {
  const result = JSON.stringify(null);

  type tests = [Expect<Equal<typeof result, string>>];
});

doNotExecute(() => {
  const result = JSON.stringify(undefined);

  type tests = [Expect<Equal<typeof result, undefined>>];
});

doNotExecute(() => {
  // create a something that is either an object or null
  let toBeStringified: {} | null = Math.random() > 0.5 ? {} : null;
  const result = JSON.stringify(toBeStringified);

  type tests = [Expect<Equal<typeof result, string>>];
});

doNotExecute(() => {
  // create a something that is either an object or undefined
  let toBeStringified: {} | undefined = Math.random() > 0.5 ? {} : undefined;
  const result = JSON.stringify(toBeStringified);

  type tests = [Expect<Equal<typeof result, string | undefined>>];
});

doNotExecute(() => {
  // create a something that is a function
  const result = JSON.stringify(function () {});

  type tests = [Expect<Equal<typeof result, undefined>>];
});

doNotExecute(() => {
  // create a something that is a function
  const result = JSON.stringify(function (hello: any, world: any) {});

  type tests = [Expect<Equal<typeof result, undefined>>];
});

doNotExecute(() => {
  // create a something that is of type any
  let toBeStringified: any;
  const result = JSON.stringify(toBeStringified);

  type tests = [Expect<Equal<typeof result, string | undefined>>];
});

doNotExecute(() => {
  const result = JSON.stringify("undefined");

  type tests = [Expect<Equal<typeof result, string>>];
});
