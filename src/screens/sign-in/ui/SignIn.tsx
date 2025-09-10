import { InputLabeled } from "@/entities/input-labeled";
import { routes } from "@/shared/routes";
import { Button } from "@/shared/ui/Button";
import { Link } from "@/shared/ui/Link";
import Image from "next/image";

export function SignIn() {
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="Your Company"
            src="/logo.svg"
            className="mx-auto h-20 w-auto"
            width={100}
            height={100}
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in
          </h2>
          <p className="mt-2 text-center text-sm/6 text-gray-500">
            Enter your email and password to sign in
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-4">
            <InputLabeled
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              label="Email address"
            />
            <InputLabeled
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              label="Password"
            />
            <Button className="mt-2 w-full" type="submit">
              Sign in
            </Button>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href={routes.signUp.url()}>Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
}
