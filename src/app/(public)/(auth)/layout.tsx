import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Image
        alt="Your Company"
        src="/logo.svg"
        className="mx-auto h-20 w-auto"
        width={100}
        height={100}
      />
      {children}
    </div>
  );
}
