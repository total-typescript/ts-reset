interface ArrayConstructor {
  isArray<T>(arg: true extends TSReset.IsAny<T> ? never : T): arg is true extends TSReset.IsAny<T> ? never : T extends ReadonlyArray<unknown> ? T : Array<T> extends T ? Array<T> : never;
}
