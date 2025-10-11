"use server";

import { LIST_OF_LANGUAGES } from "@/shared/config/config";
import { codeToLanguageEnum, LanguageEnum } from "@/shared/enums/Language";
import Negotiator from "negotiator";
import { cookies, headers } from "next/headers";

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

  if (appLanguage) return appLanguage;

  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");

  if (acceptLanguage) {
    const negotiator = new Negotiator({
      headers: { "accept-language": acceptLanguage },
    });

    const bestMatchEnum = negotiator.language(
      LIST_OF_LANGUAGES.map(({ i18n }) => i18n),
    ) as LanguageEnum | undefined;

    if (bestMatchEnum) {
      return bestMatchEnum;
    }

    const bestMatchCode = negotiator.language(
      LIST_OF_LANGUAGES.map(({ code }) => code),
    );

    if (bestMatchCode) {
      const bestMatchLanguageEnum = codeToLanguageEnum(bestMatchCode);

      if (bestMatchLanguageEnum) return bestMatchLanguageEnum;
    }
  }

  return LanguageEnum.EN;
}
