export type ErrorsType<T extends string | number | symbol> = Partial<
  Record<T, string[]>
>;
