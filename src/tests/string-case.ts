import { doNotExecute, Expect, NotEqual, Equal } from "./utils";

doNotExecute(async () => {
  const string: "A" | "B" = "A";

  const lowerCaseString = string.toLowerCase();

  type tests = [Expect<NotEqual<typeof string, typeof lowerCaseString>>];
});

doNotExecute(async () => {
  const string = "A" as "A" | "B";

  const lowerCaseString = string.toLowerCase();

  type tests = [
    Expect<Equal<typeof lowerCaseString, "a" | "b">>
  ];
});

doNotExecute(async () => {
  const string: "A" | "B" = "A";

  const lowerCaseString = string.toLocaleLowerCase();

  type tests = [Expect<NotEqual<typeof string, typeof lowerCaseString>>];
});

doNotExecute(async () => {
  const string: "A" | "B" = "A";

  const lowerCaseString = string.toLocaleLowerCase();

  type tests = [
    Expect<Equal<Lowercase<typeof string>, typeof lowerCaseString>>
  ];
});

doNotExecute(async () => {
  const string: "a" | "b" = "a";

  const upperCaseString = string.toUpperCase();

  type tests = [Expect<NotEqual<typeof string, typeof upperCaseString>>];
});

doNotExecute(async () => {
  const string: "a" | "b" = "a";

  const upperCaseString = string.toUpperCase();

  type tests = [
    Expect<Equal<Uppercase<typeof string>, typeof upperCaseString>>
  ];
});

doNotExecute(async () => {
  const string: "a" | "b" = "a";

  const upperCaseString = string.toLocaleUpperCase();

  type tests = [Expect<NotEqual<typeof string, typeof upperCaseString>>];
});

doNotExecute(async () => {
  const string: "a" | "b" = "a";

  const upperCaseString = string.toLocaleUpperCase();

  type tests = [
    Expect<Equal<Uppercase<typeof string>, typeof upperCaseString>>
  ];
});
