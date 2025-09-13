export function fetchInstance(url: string, options?: RequestInit) {
  return fetch(process.env.SYSTEM_NEXT_API_URL! + url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
}
