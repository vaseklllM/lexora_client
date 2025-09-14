import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions/authOptions";

export async function checkIsAuth() {
  const session = await getServerSession(authOptions);

  return !!session;
}
