"use server";

let inFlightRefresh: Promise<any> | null = null;

type Response = {
  token: string;
  refreshToken: string;
  expiresIn: number;
};

export async function refreshToken(refreshToken: string): Promise<Response> {
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

    // console.log("REFRESH TOKEN RESULT: ", result);

    return result.json();
  })();

  try {
    const result = await inFlightRefresh;
    return result;
  } catch (error) {
    // console.log("ERROR refreshToken: ", error);
    throw error;
  } finally {
    inFlightRefresh = null;
  }
}
