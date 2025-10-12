"use client";

import { InputLabeled } from "@/entities/input-labeled";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { noOnlySpacesStringSchema } from "@/shared/schemas/noOnlySpacesString.schema";
import { Button } from "@/shared/ui/Button";
import { assignRef } from "@/shared/utils/assign-ref";
import { sleep } from "@/shared/utils/sleep";
import { valibotResolver } from "@/shared/utils/valibot-resolver";
import { ReactElement, useCallback, useEffect, useMemo, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { tv } from "tailwind-variants";
import * as v from "valibot";

export type ModalRenameSaveHandler = (args: {
  name: string;
  close: () => Promise<void>;
  setNameError: (error: string) => void;
}) => Promise<void>;

const classesSlots = tv({
  slots: {
    base: "modal",
  },
});

interface ModalRenameProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: ModalRenameSaveHandler;
  maxNameLength?: number;
  name?: string;
  title?: string;
}

export const ModalRename = (props: ModalRenameProps): ReactElement => {
  const { maxNameLength = 50 } = props;
  const classes = classesSlots();
  const nameFieldRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const schema = useMemo(() => {
    return v.object({
      name: v.pipe(
        v.string(),
        v.transform((input) => input.trim()),
        v.nonEmpty(t("modal.rename.fields.name.errors.required")),
        noOnlySpacesStringSchema(
          t("modal.rename.fields.name.errors.noOnlySpaces"),
        ),
        v.maxLength(
          maxNameLength,
          t("modal.rename.fields.name.errors.maxLength", {
            maxLength: maxNameLength,
          }),
        ),
      ),
    });
  }, [maxNameLength]);

  type Inputs = v.InferOutput<typeof schema>;

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setError,
    clearErrors,
    watch,
    setValue,
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
    },
    resolver: valibotResolver(schema),
  });

  useEffect(() => {
    if (props.isOpen && props.name) {
      setValue("name", props.name);
    }
  }, [props.isOpen]);

  const reset = () => {
    clearErrors();
    if (props.name) {
      setValue("name", props.name);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await props.onSave({
      name: data.name.trim(),
      close: async () => {
        props.onClose();
        await sleep(200);
        reset();
      },
      setNameError: (error) => {
        setError("name", { message: error });
      },
    });
  };

  useEffect(() => {
    if (props.isOpen) {
      const timer = setTimeout(() => {
        if (nameFieldRef.current) {
          nameFieldRef.current.focus();
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [props.isOpen]);

  const nameRegister = register("name", {
    required: true,
  });

  const isNameChanged = watch("name").trim() !== props.name;

  const cancelHandler = useCallback(() => {
    props.onClose();
    sleep(200).then(() => {
      reset();
    });
  }, []);

  return (
    <dialog
      className={classes.base({ className: props.className })}
      open={props.isOpen}
      onClose={props.onClose}
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">{props.title}</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="modal-action flex flex-col gap-4"
        >
          <InputLabeled
            {...nameRegister}
            ref={assignRef(nameRegister.ref, nameFieldRef)}
            error={errors.name?.message}
            type="text"
            autoFocus={props.isOpen}
            tabIndex={-1}
            label={t("modal.rename.fields.name.label")}
            data-1p-ignore="true"
            autoComplete="off"
          />
          <div className="mt-4 flex w-full justify-end gap-4">
            <Button
              className="btn-soft"
              type="button"
              disabled={isSubmitting}
              onClick={cancelHandler}
            >
              {t("modal.rename.buttons.cancel")}
            </Button>
            <Button
              className="btn-primary"
              isLoading={isSubmitting}
              disabled={!isNameChanged}
            >
              {t("modal.rename.buttons.save")}
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
