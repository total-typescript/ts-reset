interface ArrayConstructor {
  isArray<T>(arg: T): arg is unknown extends T ? unknown[] : any[];
}
