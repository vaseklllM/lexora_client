"use server";

import { routes } from "@/shared/routes";
import { toQueryParams } from "@/shared/utils/toQueryParams";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../authOptions/authOptions";
import { ErrorStatus } from "../errorStatus";
import { Options } from "./types";

export async function fetchCustom<R>(
  url: string,
  options?: Options,
): Promise<{ ok: boolean; data: R }> {
  const useSession = options?.useSession ?? true;

  const session = useSession ? await getServerSession(authOptions) : undefined;
  const params = options?.params ? toQueryParams(options.params) : "";

  const result = await modifyFetch(url + params, {
    ...options,
    accessToken: session?.accessToken,
  });

  const data = await result.json();

  if (!result.ok) {
    switch (result.status) {
      case ErrorStatus.TOO_MANY_REQUESTS: {
        redirect(routes.tooManyRequest.url());
        break;
      }

      case ErrorStatus.UNAUTHORIZED: {
        redirect(routes.logout.url());
        break;
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
