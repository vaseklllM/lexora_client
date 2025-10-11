import { getMe } from "@/api/auth/get-me";
import { checkIsAuth } from "@/shared/api-core/checkIsAuth";
import { LIST_OF_LANGUAGES } from "@/shared/config/config";
import { LanguageProvider } from "@/shared/config/i18n";
import { AudioProvider } from "@/shared/hooks/usePlayer";
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

  let lng: string = "en";

  if (isAuth) {
    const me = await getMe();

    const language = LIST_OF_LANGUAGES.find(
      (language) => language.code === me.language.code,
    );

    if (language) {
      lng = language.i18n;
    }
  }

  return (
    <html lang={lng}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider lng={lng}>
          <NextAuthProvider>{children}</NextAuthProvider>
          <ToastContainer position="bottom-left" />
          <AudioProvider />
        </LanguageProvider>
      </body>
    </html>
  );
}
