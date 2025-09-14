"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions/authOptions";

type Options = Omit<RequestInit, "body"> & { body?: object };

export async function fetchInstance(url: string, options?: Options) {
  const session = await getServerSession(authOptions);

  return customFetch(url, { ...options, accessToken: session?.accessToken });
}

function customFetch(
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

export type FetchInstance = typeof fetchInstance;
