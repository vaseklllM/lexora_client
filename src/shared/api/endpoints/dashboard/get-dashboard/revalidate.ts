"use server";

import { revalidateTag } from "next/cache";

export const revalidateDashboard = async (tag: string) => {
  revalidateTag(tag);
};
