"use server";

import { routes } from "@/shared/routes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../authOptions/authOptions";
import { ErrorStatus } from "../errorStatus";
import { TooManyRequestsError } from "./TooManyRequestsError";
import { Options } from "./types";
import { UnauthorizedError } from "./UnauthorizedError";

export async function fetchCustom<R>(
  url: string,
  options?: Options,
): Promise<{ ok: boolean; data: R }> {
  const session = await getServerSession(authOptions);

  const result = await modifyFetch(url, {
    ...options,
    accessToken: session?.accessToken,
  });

  const data = await result.json();

  if (!result.ok) {
    switch (result.status) {
      case ErrorStatus.TOO_MANY_REQUESTS:
        throw new TooManyRequestsError(result.statusText);

      case ErrorStatus.UNAUTHORIZED: {
        redirect(routes.logout.url());
        throw new UnauthorizedError(result.statusText);
      }
    }
  }

  return {
    ok: result.ok,
    data,
  };
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
