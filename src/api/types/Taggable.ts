export interface Taggable<T = void> {
  getTag: (args: T) => string;
}
