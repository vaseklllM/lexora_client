"use server";

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
      const result = await fetch(
        `${process.env.SYSTEM_NEXT_API_URL}auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken,
          }),
        },
      );

      return await result.json();
    })();

    return await inFlightRefresh;
  } finally {
    inFlightRefresh = null;
  }
}
