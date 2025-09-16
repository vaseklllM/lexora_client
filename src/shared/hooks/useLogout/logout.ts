"use server";

import { authService } from "@/api/auth";

export async function logout() {
  await authService.logout.fetch();
}
