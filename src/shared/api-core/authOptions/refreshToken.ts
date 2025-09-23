"use server";

import { refresh } from "@/api/auth/refresh";

let inFlightRefresh: Promise<any> | null = null;

type Response = {
  token: string;
  refreshToken: string;
  expiresIn: number;
};

export async function refreshOnce(refreshToken: string): Promise<Response> {
  try {
    if (inFlightRefresh) return inFlightRefresh;

    inFlightRefresh = (async () => {
      return await refresh(refreshToken);
    })();

    return await inFlightRefresh;
  } finally {
    inFlightRefresh = null;
  }
}
