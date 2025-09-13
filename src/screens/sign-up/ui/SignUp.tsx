"use client";

import { InputLabeled } from "@/entities/input-labeled";
import { routes } from "@/shared/routes";
import { Button } from "@/shared/ui/Button";
import { Link } from "@/shared/ui/Link";
import { valibotResolver } from "@/shared/utils/valibot-resolver";
import { SubmitHandler, useForm } from "react-hook-form";
// import { signUp } from "../api/sign-up";
import { ErrorsType } from "@/shared/types/ErrorsType";
import { Alert } from "@/shared/ui/Alert";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { tv } from "tailwind-variants";
import { Fields, fieldsSchema } from "../model/fields-schema";

const classesSlots = tv({
  slots: {
    formWrapper: "mt-10 sm:mx-auto sm:w-full sm:max-w-sm",
  },
  variants: {
    errorMessage: {
      true: {
        formWrapper: "mt-5",
      },
    },
  },
});

export function SignUp() {
  const [errorMessage, setErrorMessage] = useState<string>();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setError,
  } = useForm<Fields>({
    defaultValues: {
      fullName: "John Doe",
      email: "user@example.com",
      password: "Password123!",
      passwordRepeat: "Password123!",
    },
    resolver: valibotResolver(fieldsSchema),
  });

  const onSubmit: SubmitHandler<Fields> = async (data) => {
    setErrorMessage(undefined);

    const result = await signIn("credentials", {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      passwordRepeat: data.passwordRepeat,
      redirect: false,
      type: "register",
    });

    if (!result?.ok && typeof result?.error === "string") {
      const error = JSON.parse(result.error);

      if (error.errors) {
        type FiledKeys = "email" | "name" | "password" | "confirmPassword";

        const errorsList: ErrorsType<FiledKeys> = error.errors;

        for (const key in errorsList) {
          const fieldKey = key as FiledKeys;
          const errorMessage = errorsList[fieldKey]?.[0];

          if (typeof errorMessage === "string") {
            switch (fieldKey) {
              case "email":
                setError("email", { message: errorMessage });
                break;

              case "name":
                setError("fullName", { message: errorMessage });
                break;

              case "password":
                setError("password", { message: errorMessage });
                break;

              case "confirmPassword":
                setError("passwordRepeat", { message: errorMessage });
                break;
            }
          }
        }
      } else {
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
        <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight">
          Sign up
        </h2>
        <p className="text-base-content/70 mt-2 text-center text-sm/6">
          Enter your email and password to sign up
        </p>
      </div>

      {errorMessage && (
        <Alert type="error" message={errorMessage} className="mt-5" />
      )}

      <div className={classes.formWrapper()}>
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
            Sign up
          </Button>
        </form>

        <p className="text-base-content/70 mt-5 text-center text-sm/6">
          Already have an account?{" "}
          <Link href={routes.signIn.url()}>Sign in</Link>
        </p>
      </div>
    </>
  );
}
