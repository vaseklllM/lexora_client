import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen justify-center">
      <div className="overflow-y-auto lg:w-3/7 xl:w-2/5">
        <div className="flex min-h-full flex-col items-center justify-center px-6 py-12">
          <Image
            alt="Your Company"
            src="/logo.svg"
            className="mx-auto h-20 w-auto flex-shrink-0"
            width={100}
            height={100}
          />
          <div className="w-full max-w-sm flex-shrink-0">{children}</div>
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
    </div>
  );
}
