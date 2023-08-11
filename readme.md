# `ts-reset`

TypeScript's built-in typings are not perfect. `ts-reset` makes them better.

**Without `ts-reset`**:

- 🚨 `.json` (in `fetch`) and `JSON.parse` both return `any`
- 🤦 `.filter(Boolean)` doesn't behave how you expect
- 😡 `array.includes` often breaks on readonly arrays

`ts-reset` smooths over these hard edges, just like a CSS reset does in the browser.

**With `ts-reset`**:

- 👍 `.json` (in `fetch`) and `JSON.parse` both return `unknown`
- ✅ `.filter(Boolean)` behaves EXACTLY how you expect
- 🥹 `array.includes` is widened to be more ergonomic
- 🚀 And several more changes!

## Example

```ts
// Import in a single file, then across your whole project...
import "@total-typescript/ts-reset";

// .filter just got smarter!
const filteredArray = [1, 2, undefined].filter(Boolean); // number[]

// Get rid of the any's in JSON.parse and fetch
const result = JSON.parse("{}"); // unknown

fetch("/")
  .then((res) => res.json())
  .then((json) => {
    console.log(json); // unknown
  });
```

### DOM Example

```ts
// Import from /dom to get DOM rules too!
import "@total-typescript/ts-reset/dom";

// localStorage just got safer!
localStorage.abc; // unknown

// sessionStorage just got safer!
sessionStorage.abc; // unknown
```

## Get Started

1. Install: `npm i -D @total-typescript/ts-reset`

2. Create a `reset.d.ts` file in your project with these contents:

```ts
// Do not add any other lines of code to this file!
import "@total-typescript/ts-reset";
```

3. Enjoy improved typings across your _entire_ project.

## Get Started (Monorepo)

1. Install: `npm i -D @total-typescript/ts-reset` to your root package.json

2. Create a `reset.d.ts` file in the root of your project:

```ts
import "@total-typescript/ts-reset";
```

3. In your individual packages `tsconfig.json`, add the relative path from your package to the `reset.d.ts` file
```json
"include": [
    "../../reset.d.ts",
  ]
```

### Installing only certain rules

By importing from `@total-typescript/ts-reset`, you're bundling _all_ the recommended rules.

To only import the rules you want, you can import like so:

```ts
// Makes JSON.parse return unknown
import "@total-typescript/ts-reset/json-parse";

// Makes await fetch().then(res => res.json()) return unknown
import "@total-typescript/ts-reset/fetch";
```

For these imports to work, you'll need to ensure that, in your `tsconfig.json`, `module` is set to `NodeNext` or `Node16`.

Below is a full list of all the rules available.

## Caveats

### Use `ts-reset` in applications, not libraries

`ts-reset` is designed to be used in application code, not library code. Each rule you include will make changes to the global scope. That means that, simply by importing your library, your user will be unknowingly opting in to `ts-reset`.

## Rules

### Make `JSON.parse` return `unknown`

```ts
import "@total-typescript/ts-reset/json-parse";
```

`JSON.parse` returning `any` can cause nasty, subtle bugs. Frankly, any `any`'s can cause bugs because they disable typechecking on the values they describe.

```ts
// BEFORE
const result = JSON.parse("{}"); // any
```

By changing the result of `JSON.parse` to `unknown`, we're now forced to either validate the `unknown` to ensure it's the correct type (perhaps using [`zod`](https://github.com/colinhacks/zod)), or cast it with `as`.

```ts
// AFTER
import "@total-typescript/ts-reset/json-parse";

const result = JSON.parse("{}"); // unknown
```

### Make `.json()` return `unknown`

```ts
import "@total-typescript/ts-reset/fetch";
```

Just like `JSON.parse`, `.json()` returning `any` introduces unwanted `any`'s into your application code.

```ts
// BEFORE
fetch("/")
  .then((res) => res.json())
  .then((json) => {
    console.log(json); // any
  });
```

By forcing `res.json` to return `unknown`, we're encouraged to distrust its results, making us more likely to validate the results of `fetch`.

```ts
// AFTER
import "@total-typescript/ts-reset/fetch";

fetch("/")
  .then((res) => res.json())
  .then((json) => {
    console.log(json); // unknown
  });
```

### Make `.filter(Boolean)` filter out falsy values

```ts
import "@total-typescript/ts-reset/filter-boolean";
```

The default behaviour of `.filter` can feel pretty frustrating. Given the code below:

```ts
// BEFORE
const filteredArray = [1, 2, undefined].filter(Boolean); // (number | undefined)[]
```

It feels natural that TypeScript should understand that you've filtered out the `undefined` from `filteredArray`. You can make this work, but you need to mark it as a type predicate:

```ts
const filteredArray = [1, 2, undefined].filter((item): item is number => {
  return !!item;
}); // number[]
```

Using `.filter(Boolean)` is a really common shorthand for this. So, this rule makes it so `.filter(Boolean)` acts like a type predicate on the array passed in, removing any falsy values from the array member.

```ts
// AFTER
import "@total-typescript/ts-reset/filter-boolean";

const filteredArray = [1, 2, undefined].filter(Boolean); // number[]
```

### Make `.includes` on `as const` arrays less strict

```ts
import "@total-typescript/ts-reset/array-includes";
```

This rule improves on TypeScript's default `.includes` behaviour. Without this rule enabled, the argument passed to `.includes` MUST be a member of the array it's being tested against.

```ts
// BEFORE
const users = ["matt", "sofia", "waqas"] as const;

// Argument of type '"bryan"' is not assignable to
// parameter of type '"matt" | "sofia" | "waqas"'.
users.includes("bryan");
```

This can often feel extremely awkward. But with the rule enabled, `.includes` now takes a widened version of the literals in the `const` array.

```ts
// AFTER
import "@total-typescript/ts-reset/array-includes";

const users = ["matt", "sofia", "waqas"] as const;

// .includes now takes a string as the first parameter
users.includes("bryan");
```

This means you can test non-members of the array safely.

### Make `.indexOf` on `as const` arrays less strict

```ts
import "@total-typescript/ts-reset/array-index-of";
```

Exactly the same behaviour of `.includes` (explained above), but for `.lastIndexOf` and `.indexOf`.

### Make `Set.has()` less strict

```ts
import "@total-typescript/ts-reset/set-has";
```

Similar to `.includes`, `Set.has()` doesn't let you pass members that don't exist in the set:

```ts
// BEFORE
const userSet = new Set(["matt", "sofia", "waqas"] as const);

// Argument of type '"bryan"' is not assignable to
// parameter of type '"matt" | "sofia" | "waqas"'.
userSet.has("bryan");
```

With the rule enabled, `Set` is much smarter:

```ts
// AFTER
import "@total-typescript/ts-reset/set-has";

const userSet = new Set(["matt", "sofia", "waqas"] as const);

// .has now takes a string as the argument!
userSet.has("bryan");
```

### Make `Map.has()` less strict

```ts
import "@total-typescript/ts-reset/map-has";
```

Similar to `.includes` or `Set.has()`, `Map.has()` doesn't let you pass members that don't exist in the map's keys:

```ts
// BEFORE
const userMap = new Map([
  ["matt", 0],
  ["sofia", 1],
  [2, "waqas"],
] as const);

// Argument of type '"bryan"' is not assignable to
// parameter of type '"matt" | "sofia" | "waqas"'.
userMap.has("bryan");
```

With the rule enabled, `Map` follows the same semantics as `Set`.

```ts
// AFTER
import "@total-typescript/ts-reset/map-has";

const userMap = new Map([
  ["matt", 0],
  ["sofia", 1],
  [2, "waqas"],
] as const);

// .has now takes a string as the argument!
userMap.has("bryan");
```

### Removing `any[]` from `Array.isArray()`

```ts
import "@total-typescript/ts-reset/is-array";
```

When you're using `Array.isArray`, you can introduce subtle `any`'s into your app's code.

```ts
// BEFORE

const validate = (input: unknown) => {
  if (Array.isArray(input)) {
    console.log(input); // any[]
  }
};
```

With `is-array` enabled, this check will now mark the value as `unknown[]`:

```ts
// AFTER
import "@total-typescript/ts-reset/is-array";

const validate = (input: unknown) => {
  if (Array.isArray(input)) {
    console.log(input); // unknown[]
  }
};
```

### Making `sessionStorage` and `localStorage` safer

By default, `localStorage` and `sessionStorage` let you access any key, and return `any`:

```ts
// BEFORE

// No error!
localStorage.a.b.c.ohDear; // any
```

With this rule enabled, these keys now get typed as `unknown`:

```ts
// AFTER
import "@total-typescript/ts-reset/storage";

// Error!
localStorage.a.b.c.ohDear;
```

## Rules we won't add

### `Object.keys`/`Object.entries`

A common ask is to provide 'better' typings for `Object.keys`, so that it returns `Array<keyof T>` instead of `Array<string>`. Same for `Object.entries`. `ts-reset` won't be including rules to change this.

TypeScript is a structural typing system. One of the effects of this is that TypeScript can't always guarantee that your object types don't contain excess properties:

```ts
type Func = () => {
  id: string;
};

const func: Func = () => {
  return {
    id: "123",
    // No error on an excess property!
    name: "Hello!",
  };
};
```

So, the only reasonable type for `Object.keys` to return is `Array<string>`.

### Generics for `JSON.parse`, `Response.json` etc

A common request is for `ts-reset` to add type arguments to functions like `JSON.parse`:

```ts
const str = JSON.parse<string>('"hello"');

console.log(str); // string
```

This appears to improve the DX by giving you autocomplete on the thing that gets returned from `JSON.parse`.

However, we argue that this is a lie to the compiler and so, unsafe.

`JSON.parse` and `fetch` represent _validation boundaries_ - places where unknown data can enter your application code.

If you _really_ know what data is coming back from a `JSON.parse`, then an `as` assertion feels like the right call:

```ts
const str = JSON.parse('"hello"') as string;

console.log(str); // string
```

This provides the types you intend and also signals to the developer that this is _slightly_ unsafe.
