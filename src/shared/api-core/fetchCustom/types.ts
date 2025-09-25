export type Options = Omit<RequestInit, "body"> & {
  body?: object;
  params?: object;
  useSession?: boolean;
};
