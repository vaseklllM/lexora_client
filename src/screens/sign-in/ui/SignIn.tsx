"use client";

import { InputLabeled } from "@/entities/input-labeled";
import { routes } from "@/shared/routes";
import { emailSchema } from "@/shared/schemas/email.schema";
import { passwordSchema } from "@/shared/schemas/password.schema";
import { Button } from "@/shared/ui/Button";
import { Link } from "@/shared/ui/Link";
import { valibotResolver } from "@/shared/utils/valibotResolver";
import { SubmitHandler, useForm } from "react-hook-form";
import * as v from "valibot";

const schema = v.object({
  email: emailSchema(),
  password: passwordSchema(),
});

type Inputs = v.InferOutput<typeof schema>;

export function SignIn() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: valibotResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = () => {
    // console.log(data);
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
          Sign in
        </h2>
        <p className="text-base-content/70 mt-2 text-center text-sm/6">
          Enter your email and password to sign in
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputLabeled
            {...register("email", {
              required: true,
            })}
            id="email"
            name="email"
            error={errors.email?.message}
            type="email"
            autoComplete="email"
            label="Email address"
          />
          <InputLabeled
            {...register("password", {
              required: true,
            })}
            id="password"
            name="password"
            error={errors.password?.message}
            type="password"
            autoComplete="current-password"
            label="Password"
          />
          <Button className="mt-2 w-full" type="submit">
            Sign in
          </Button>
        </form>

        <p className="text-base-content/70 mt-10 text-center text-sm/6">
          Don&apos;t have an account?{" "}
          <Link href={routes.signUp.url()}>Sign up</Link>
        </p>
      </div>
    </>
  );
}
