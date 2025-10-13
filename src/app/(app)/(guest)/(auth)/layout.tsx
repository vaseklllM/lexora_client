import { getAllLanguages } from "@/api/languages/get-all-languages";
import { AppLanguageSelect } from "@/features/app-language-select";
import { languageEnumToCode } from "@/shared/enums/Language";
import { getAppLanguageCookie } from "@/shared/utils/setAppLanguageCookie";
import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function RootLayout(props: Props) {
  const allLanguages = await getAllLanguages();
  const appLanguage = await getAppLanguageCookie();

  return (
    <div className="dark:bg-base-300 flex h-screen justify-center">
      <div className="w-full overflow-y-auto lg:w-3/7 xl:w-2/5">
        <div className="flex min-h-full flex-col items-center p-4 md:justify-center md:p-6">
          <Image
            alt="Your Company"
            src="/logo.svg"
            className="mx-auto h-12 w-auto flex-shrink-0 sm:h-14 md:h-20"
            width={100}
            height={100}
          />
          <div className="w-full max-w-sm flex-shrink-0">{props.children}</div>
        </div>
      </div>
      <div className="bg-primary hidden flex-col items-center justify-center lg:flex lg:w-4/7 xl:w-3/5">
        <Image
          src="/auth_background.png"
          alt="auth_background"
          width={2700}
          height={3000}
          className="w-2/3"
        />
      </div>
      <AppLanguageSelect
        allLanguages={allLanguages.data}
        className="fixed top-2 left-2 w-max"
        type="icon_button"
        activeLanguageCode={languageEnumToCode(appLanguage)}
        dropdownPosition="bottom-start"
      />
    </div>
  );
}
