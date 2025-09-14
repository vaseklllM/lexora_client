export interface Fetchable<Args = any, Response = any> {
  fetch(args: Args): Promise<Response>;
}
