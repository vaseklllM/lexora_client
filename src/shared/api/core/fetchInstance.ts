// import { jwtDecode } from "jwt-decode";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions/authOptions";

export async function fetchInstance(url: string, options?: RequestInit) {
  const session = await getServerSession(authOptions);

  // console.log(
  //   "fetchInstance: ",
  //   (jwtDecode(session?.accessToken as string).exp! * 1000 - Date.now()) / 1000,
  // );

  return fetch(process.env.SYSTEM_NEXT_API_URL! + url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
}

export type FetchInstance = typeof fetchInstance;
