import type { Metadata } from "next";

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

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
