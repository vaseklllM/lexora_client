import { InputLabeled } from "@/entities/input-labeled";
import { Button } from "@/shared/ui/Button";
import { Checkbox } from "@/shared/ui/Checkbox";

export function SignIn() {
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
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

            <div>
              <Button type="submit">Sign in</Button>
            </div>
          </form>

          <Checkbox />

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
