import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen justify-center">
      <div className="flex flex-col items-center justify-center lg:w-3/7 xl:w-2/5">
        <Image
          alt="Your Company"
          src="/logo.svg"
          className="mx-auto h-20 w-auto"
          width={100}
          height={100}
        />
        {children}
      </div>
      <div className="hidden flex-col items-center justify-center lg:flex lg:w-4/7 xl:w-3/5">
        <Image
          src="/auth_background.png"
          alt="auth_background"
          width={2000}
          height={1500}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
