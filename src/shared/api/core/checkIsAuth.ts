"use server";

import { getServerSession } from "next-auth";

export async function checkIsAuth() {
  const session = await getServerSession();

  return !!session;
}
