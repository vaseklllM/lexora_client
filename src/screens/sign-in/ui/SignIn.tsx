"use client";

import { InputLabeled } from "@/entities/input-labeled";
import { OAuth } from "@/features/oauth";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { routes } from "@/shared/routes";
import { emailSchema } from "@/shared/schemas/email.schema";
import { passwordSchema } from "@/shared/schemas/password.schema";
import { Alert } from "@/shared/ui/Alert";
import { Button } from "@/shared/ui/Button";
import { Link } from "@/shared/ui/Link";
import { revalidateHomePath } from "@/shared/utils/revalidateHomePath";
import { valibotResolver } from "@/shared/utils/valibot-resolver";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { tv } from "tailwind-variants";
import * as v from "valibot";

const classesSlots = tv({
  slots: {
    formWrapper: "mt-6 sm:mx-auto sm:w-full sm:max-w-sm md:mt-10",
  },
  variants: {
    errorMessage: {
      true: {
        formWrapper: "mt-5",
      },
    },
  },
});

const schema = v.object({
  email: emailSchema(),
  password: passwordSchema(),
});

type Inputs = v.InferOutput<typeof schema>;

export function SignIn() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<Inputs>({
    defaultValues: {
      email: "user@example.com",
      password: "Password123!",
    },
    resolver: valibotResolver(schema),
  });
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setErrorMessage(undefined);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      type: "login",
    });

    if (result?.ok) {
      await revalidateHomePath();
      router.push(routes.dashboard.url());
    } else if (typeof result?.error === "string") {
      const error = JSON.parse(result.error);
      if (typeof error.message === "string") {
        setErrorMessage(error.message);
      }
    }
  };

  const classes = classesSlots({
    errorMessage: !!errorMessage,
  });

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-4 text-center text-2xl/9 font-bold tracking-tight lg:mt-10">
          {t("Sign in")}
        </h2>
        <p className="text-base-content/70 mt-2 text-center text-sm/6">
          Enter your email and password to sign in
        </p>
      </div>

      {errorMessage && (
        <Alert type="error" message={errorMessage} className="mt-5" />
      )}

      <div className={classes.formWrapper()}>
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
          <Button
            className="btn-primary mt-2 w-full"
            type="submit"
            isLoading={isSubmitting}
          >
            Sign in
          </Button>
        </form>

        <p className="text-base-content/70 mt-6 text-center text-sm/6">
          Don&apos;t have an account?{" "}
          <Link href={routes.signUp.url()}>Sign up</Link>
        </p>
        <OAuth />
      </div>
    </>
  );
}
