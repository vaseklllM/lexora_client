import { getMe } from "@/api/auth/get-me";
import { checkIsAuth } from "@/shared/api-core/checkIsAuth";
import { LanguageProvider } from "@/shared/config/i18n";
import { codeToLanguageEnum, LanguageEnum } from "@/shared/enums/Language";
import { AudioProvider } from "@/shared/hooks/usePlayer";
import { getAppLanguageCookie } from "@/shared/utils/setAppLanguageCookie";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { NextAuthProvider } from "../screens/providers/NextAuthProvider";
import "./animations.css";
import "./globalImports.css";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lexora",
  description:
    "Lexora is a modern language learning app powered by flashcards. Create decks and folders, get translations, examples, and AI-generated audio",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  const { children } = props;
  const isAuth = await checkIsAuth();

  let language: LanguageEnum = LanguageEnum.EN;

  if (isAuth) {
    const me = await getMe();

    const userLanguage = codeToLanguageEnum(me.language.code);
    if (userLanguage) language = userLanguage;
  } else {
    const appLanguage = await getAppLanguageCookie();

    if (appLanguage) {
      language = appLanguage;
    }
  }

  return (
    <html lang={language}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider lng={language}>
          <NextAuthProvider>{children}</NextAuthProvider>
          <ToastContainer position="bottom-left" />
          <AudioProvider />
        </LanguageProvider>
      </body>
    </html>
  );
}
