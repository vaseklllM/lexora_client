import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen justify-center">
      <div className="flex w-2/5 flex-col items-center justify-center">
        <Image
          alt="Your Company"
          src="/logo.svg"
          className="mx-auto h-20 w-auto"
          width={100}
          height={100}
        />
        {children}
      </div>
      <div className="flex w-3/5 flex-col items-center justify-center">
        <Image
          src="/auth_background.avif"
          alt="auth_background"
          width={1000}
          height={1000}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
