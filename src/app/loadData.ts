"use server";

import { authOptions } from "@/shared/api/core/authOptions";
import { getServerSession } from "next-auth";

export async function loadData() {
  const session = await getServerSession(authOptions);

  return session;
}
