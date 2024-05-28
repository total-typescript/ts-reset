interface JSON {
  /**
   * Converts a JavaScript Object Notation (JSON) string into an object.
   * @param value A valid JSON string or null.
   * @param reviver A function that transforms the results. This function is called for each member of the object.
   * If a member contains nested objects, the nested objects are transformed before the parent object is.
   */
  parse(
    value: string,
    reviver?: (this: any, key: string, value: any) => any,
  ): unknown;
  parse(
    value: null,
    reviver?: (this: any, key: string, value: any) => any,
  ): null;
  parse(
    value: string | null,
    reviver?: (this: any, key: string, value: any) => any,
  ): unknown;
}
