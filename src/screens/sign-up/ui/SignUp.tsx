"use client";

import { InputLabeled } from "@/entities/input-labeled";
import { routes } from "@/shared/routes";
import { Button } from "@/shared/ui/Button";
import { Link } from "@/shared/ui/Link";
import { valibotResolver } from "@/shared/utils/valibotResolver";
import { SubmitHandler, useForm } from "react-hook-form";
// import { signUp } from "../api/sign-up";
import { signIn } from "next-auth/react";
import { Fields, fieldsSchema } from "../model/fields-schema";

export function SignUp() {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<Fields>({
    defaultValues: {
      fullName: "dasd",
      email: "d12asd@asdw.com",
      password: "waeq2A",
      passwordRepeat: "waeq2A",
    },
    resolver: valibotResolver(fieldsSchema),
  });

  const onSubmit: SubmitHandler<Fields> = async (data) => {
    await signIn("credentials", {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      passwordRepeat: data.passwordRepeat,
      redirect: false,
    });

    // console.log(result);
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight">
          Sign up
        </h2>
        <p className="text-base-content/70 mt-2 text-center text-sm/6">
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
          <Button
            isLoading={isSubmitting}
            className="mt-2 w-full"
            type="submit"
          >
            Sign in
          </Button>
        </form>

        <p className="text-base-content/70 mt-10 text-center text-sm/6">
          Already have an account?{" "}
          <Link href={routes.signIn.url()}>Sign in</Link>
        </p>
      </div>
    </>
  );
}
