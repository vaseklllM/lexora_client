"use client";

import { InputLabeled } from "@/entities/input-labeled";
import { routes } from "@/shared/routes";
import { emailSchema } from "@/shared/schemas/email.schema";
import { fullNameSchema } from "@/shared/schemas/fullName.schema";
import { passwordSchema } from "@/shared/schemas/password.schema";
import { passwordRepeatSchema } from "@/shared/schemas/passwordRepeat.schema";
import { Button } from "@/shared/ui/Button";
import { Link } from "@/shared/ui/Link";
import { valibotResolver } from "@/shared/utils/valibotResolver";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import * as v from "valibot";

const schema = v.pipe(
  v.object({
    fullName: fullNameSchema(),
    email: emailSchema(),
    password: passwordSchema(),
    passwordRepeat: passwordRepeatSchema(),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["passwordRepeat"]],
      (input) => input.password === input.passwordRepeat,
      "The two passwords do not match.",
    ),
    ["passwordRepeat"],
  ),
);

type Inputs = v.InferOutput<typeof schema>;

export function SignUp() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<Inputs>({
    // defaultValues: {
    //   fullName: "dasd",
    //   email: "d12asd@asdw.com",
    //   password: "waeq2A",
    //   passwordRepeat: "waeq2A",
    // },
    resolver: valibotResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = () => {
    // console.log(data);
  };

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
            Sign up
          </h2>
          <p className="mt-2 text-center text-sm/6 text-gray-500">
            Enter your email and password to sign up
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputLabeled
              {...register("fullName", {
                required: true,
              })}
              id="full-name"
              name="fullName"
              error={errors.fullName?.message}
              type="text"
              autoComplete="fullName"
              label="Full name"
            />
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
            <InputLabeled
              {...register("passwordRepeat", {
                required: true,
              })}
              id="password-repeat"
              name="passwordRepeat"
              error={errors.passwordRepeat?.message}
              type="password"
              autoComplete="current-password"
              label="Password repeat"
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
