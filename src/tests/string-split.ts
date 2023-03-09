
import { doNotExecute, Equal, Expect } from "./utils";

doNotExecute(() => {
	const result = ''.split('')
	type tests = [Expect<Equal<typeof result, string[]>>];
});

doNotExecute(() => {
	const result = ''.split('')[0]

	type tests = [Expect<Equal<typeof result, string | undefined>>];
});

doNotExecute(() => {
	const result = 'value'.split('test')

	type tests = [Expect<Equal<typeof result, [string, ...string[]]>>];
});

doNotExecute(() => {
	const result = 'value'.split('test')[0]

	type tests = [Expect<Equal<typeof result, string>>];
});

doNotExecute(() => {
	const result = 'value'.split('test')[1]

	type tests = [Expect<Equal<typeof result, string | undefined>>];
});

doNotExecute(() => {
	const result = 'value'.split('test', 0)

	type tests = [Expect<Equal<typeof result, []>>];
});

doNotExecute(() => {
	const result = 'value'.split('test', 1)

	type tests = [Expect<Equal<typeof result, [string, ...string[]]>>];
});
