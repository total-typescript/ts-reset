declare namespace TSReset {
  type JsonPrimitive = string | number | boolean | null;

  type JsonComposite<A> = Record<string, A> | A[];

  type JsonValueF<A> = JsonPrimitive | JsonComposite<A>;

  type JsonValue = JsonPrimitive | JsonObject | JsonValue[];

  type JsonObject = { [key: string]: JsonValue };

  type JsonHolder<K extends string, A> = Record<K, JsonValueF<A>>;

  type ToJson<A> = A extends { toJSON(...args: unknown[]): infer T } ? T : A;
}
