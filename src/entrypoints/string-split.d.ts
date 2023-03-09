interface String {
	split<Separator extends string, Limit extends number>(separator: Separator, limit?: Limit): Limit extends 0 ? []
		: Separator extends '' ? string[]
		: [string, ...string[]]
}
