export function parseBadRequestErrors<T extends string>(
  errors: { [key in T]?: string[] },
  callback: (args: { field: T; firstError: string; errors: string[] }) => void,
) {
  if (errors && callback) {
    for (const key in errors) {
      const field = key as T;
      const value = errors[field];
      if (value && typeof value[0] === "string") {
        callback({ field, errors: value, firstError: value[0] });
      }
    }
  }
}
