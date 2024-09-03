interface JSON {
  /**
   * Converts a JavaScript value to a JavaScript Object Notation (JSON) string or undefined.
   * @param value A JavaScript value, usually an object or array, to be converted.
   * @param replacer A function that transforms the results.
   * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
   */
  stringify<T>(
    value: T,
    replacer?: (this: any, key: string, value: any) => any,
    space?: string | number,
  ): T extends {} | null
    ? T extends (..._: any) => void
      ? undefined
      : string
    : T extends undefined
    ? undefined
    : string | undefined;
  /**
   * Converts a JavaScript value to a JavaScript Object Notation (JSON) string or undefined.
   * @param value A JavaScript value, usually an object or array, to be converted.
   * @param replacer An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified.
   * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
   */
  stringify<T>(
    value: T,
    replacer?: (number | string)[] | null,
    space?: string | number,
  ): T extends {} | null
    ? T extends (..._: any) => void
      ? undefined
      : string
    : T extends undefined
    ? undefined
    : string | undefined;
}
