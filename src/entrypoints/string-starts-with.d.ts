interface String {
  /**
   * Returns true if the sequence of elements of searchString converted to a String is the
   * same as the corresponding elements of this object (converted to a String) starting at
   * position. Otherwise returns false.
   */
  startsWith<P extends string>(searchString: P): this is `${P}${string}`;
  startsWith<P extends string>(searchString: P, position: 0): this is `${P}${string}`;
}
