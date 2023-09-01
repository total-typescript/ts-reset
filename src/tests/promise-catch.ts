import { doNotExecute, Equal, Expect } from "./utils";

doNotExecute(async () => {
  Promise.reject('string instead of Error').catch((err) => {
    // @ts-expect-error
    err.cause;
  });

  Promise.reject('string instead of Error').then(() => {}, (err) => {
    // @ts-expect-error
    err.cause;
  });
});
