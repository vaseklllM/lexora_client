"use server";

import { authService } from "@/shared/api/endpoints/auth";

export async function logout() {
  await authService.logout.fetch();
}
