import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { NextAuthProvider } from "../screens/providers/NextAuthProvider";
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

export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  const { children } = props;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          <div className="ball-holder">
            <div className="ball"></div>
          </div>
          <style>
            {`
              .ball {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(teal, #000);
  }

  .ball {
    display: block;
    transition: all 2s;
  }

  .ball-holder:hover .ball {
    transform: translateX(calc(100vw - 80px)) rotate(360deg);
  }
            `}
          </style>
        </div>
        <NextAuthProvider>{children}</NextAuthProvider>
        <ToastContainer position="bottom-left" />
      </body>
    </html>
  );
}
