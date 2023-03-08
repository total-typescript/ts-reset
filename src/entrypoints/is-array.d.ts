interface ArrayConstructor {
  isArray<T>(arg: T[] extends T ? T | T[] : never): arg is T[] extends T ? T[] : never;
}
