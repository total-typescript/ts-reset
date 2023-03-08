import { doNotExecute, Equal, Expect } from "./utils";

doNotExecute(() => {
  const result = require("test");

  type tests = [Expect<Equal<typeof result, unknown>>];
});
