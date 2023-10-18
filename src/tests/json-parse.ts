import { doNotExecute, Equal, Expect } from "./utils";

doNotExecute(() => {
  const result = JSON.parse("{}");

  type tests = [Expect<Equal<typeof result, unknown>>];
});

doNotExecute(() => {
  // Make tests fail when someone tries to PR JSON.parse<T>

  // @ts-expect-error
  const result = JSON.parse<string>("{}");
});

doNotExecute(() => {
  const result = JSON.parse(null);

  type tests = [Expect<Equal<typeof result, null>>];
});

doNotExecute(() => {
  const func = (): string | null => null;
  const result = JSON.parse(func());

  type tests = [Expect<Equal<typeof result, unknown>>];
});
