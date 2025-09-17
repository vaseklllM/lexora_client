import { ErrorStatus } from "./errorStatus";

type ErrorMessage<T extends string> = {
  statusCode: ErrorStatus.BAD_REQUEST;
  error: string;
  messages: string[];
  message: string;
  errors?: { [key in T]?: string[] };
};

export function parseError<T extends string>(
  error: Error,
  callback?: (args: { field: T; firstError: string; errors: string[] }) => void,
): ErrorMessage<T> {
  const data = JSON.parse(error.message);

  if (data.errors && callback) {
    for (const key in data.errors) {
      const field = key as T;
      const value = data.errors[field];
      if (typeof value[0] === "string") {
        callback({ field, errors: value, firstError: value[0] });
      }
    }
  }

  if (Array.isArray(data.message)) {
    data.messages = data.message;
    data.message = data.message[0];
  } else {
    data.messages = [data.message];
  }

  return data;
}
