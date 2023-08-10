import { doNotExecute, Equal, Expect, ExpectFalse } from "./utils";

doNotExecute(() => {
  const str: string = '#hashtag';

  if (str.startsWith('#')) {
    type tests = [Expect<Equal<typeof str, `#${string}`>>];
  };

  if (str.startsWith('#', 0)) {
    type tests = [Expect<Equal<typeof str, `#${string}`>>];
  };

  if (str.startsWith('#', 1)) {
    type tests = [
      ExpectFalse<Equal<typeof str, `#${string}`>>,
      Expect<Equal<typeof str, string>>,
    ];
  };
});

doNotExecute(() => {
  const str = '#hashtag' as const;
  
  if (str.startsWith('#')) {
    // type does not narrow
    type tests = [Expect<Equal<typeof str, '#hashtag'>>];
  };
});
