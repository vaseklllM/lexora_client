import { revalidateTag } from "next/cache";

export async function GET() {
  await revalidateTag("cats");
  // await revalidatePath("/");
  return Response.json({ revalidated: true });
}
