"use server";

import { LanguageEnum } from "@/shared/enums/Language";
import { cookies } from "next/headers";

const LANGUAGE_COOKIE_NAME = "app_language";

export async function setAppLanguageCookie(languageCode: LanguageEnum) {
  const cookieStore = await cookies();

  cookieStore.set(LANGUAGE_COOKIE_NAME, languageCode, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
    sameSite: "lax",
  });
}

export async function getAppLanguageCookie(): Promise<LanguageEnum> {
  const cookieStore = await cookies();

  const appLanguage = cookieStore.get(LANGUAGE_COOKIE_NAME)?.value as
    | LanguageEnum
    | undefined;

  return appLanguage ?? LanguageEnum.EN;
}
