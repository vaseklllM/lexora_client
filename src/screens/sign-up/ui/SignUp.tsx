import { InputLabeled } from "@/entities/input-labeled";
import { routes } from "@/shared/routes";
import { Button } from "@/shared/ui/Button";
import { Link } from "@/shared/ui/Link";

export function SignUp() {
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          /> */}
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up
          </h2>
          <p className="mt-2 text-center text-sm/6 text-gray-500">
            Enter your email and password to sign up
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
            <InputLabeled
              id="password-confirmation"
              name="password-confirmation"
              type="password"
              required
              autoComplete="current-password"
              label="Password confirmation"
            />
            <Button className="mt-2 w-full" type="submit">
              Sign in
            </Button>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an account?{" "}
            <Link href={routes.signIn.url()}>Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
}
