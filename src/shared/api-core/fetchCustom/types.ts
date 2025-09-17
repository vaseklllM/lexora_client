export type Options = Omit<RequestInit, "body"> & {
  body?: object;
  params?: Record<string, string>;
};
