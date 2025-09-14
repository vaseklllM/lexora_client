"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions/authOptions";
import { ErrorStatus } from "../errorStatus";
import { TooManyRequestsError } from "./TooManyRequestsError";
import { Options } from "./types";

export async function fetchCustom(url: string, options?: Options) {
  const session = await getServerSession(authOptions);

  const result = await modifyFetch(url, {
    ...options,
    accessToken: session?.accessToken,
  });

  if (!result.ok) {
    if (result.status === ErrorStatus.TOO_MANY_REQUESTS) {
      throw new TooManyRequestsError(result.statusText);
    }
  }

  return result;
}

function modifyFetch(
  url: string,
  options?: Options & { accessToken?: string },
) {
  const requestOptions: RequestInit = {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  };

  if (options?.accessToken) {
    (requestOptions.headers as Record<string, string>).Authorization =
      `Bearer ${options?.accessToken}`;
  }

  return fetch(process.env.SYSTEM_NEXT_API_URL! + url, requestOptions);
}

export type FetchCustomType = typeof fetchCustom;
