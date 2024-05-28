interface JSON {
  /**
   * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
   * @param value A JavaScript value, usually an object or array, to be converted.
   * @param replacer (Not Used)
   * @param space (Not Used)
   */
  stringify(
    value: undefined | ((...args: any[]) => any),
    replacer?: any,
    space?: any,
  ): undefined;
  /**
   * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
   * @param value A JavaScript value, usually an object or array, to be converted.
   * @param replacer A function that transforms the results.
   * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
   */
  stringify<T = any>(
    value: T,
    replacer?: (this: any, key: string, value: any) => any,
    space?: string | number,
  ): undefined extends T
    ? string | undefined
    : ((...args: any[]) => any) extends T
    ? string | undefined
    : string;
  /**
   * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
   * @param value A JavaScript value, usually an object or array, to be converted.
   * @param replacer An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified.
   * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
   */
  stringify<T = any>(
    value: T,
    replacer?: (number | string)[] | null,
    space?: string | number,
  ): undefined extends T
    ? string | undefined
    : ((...args: any[]) => any) extends T
    ? string | undefined
    : string;
}
