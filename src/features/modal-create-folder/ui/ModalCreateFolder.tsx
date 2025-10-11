import { revalidateGetDashboard } from "@/api/dashboard/get-dashboard";
import { createFolder } from "@/api/folder/create-folder";
import { InputLabeled } from "@/entities/input-labeled";
import { ErrorStatus } from "@/shared/api-core/errorStatus";
import { parseBadRequestErrors } from "@/shared/api-core/parseBadRequestErrors";
import { MAX_FOLDER_NAME_LENGTH } from "@/shared/config/config";
import { noOnlySpacesStringSchema } from "@/shared/schemas/noOnlySpacesString.schema";
import { Button } from "@/shared/ui/Button";
import { assignRef } from "@/shared/utils/assign-ref";
import { sleep } from "@/shared/utils/sleep";
import { valibotResolver } from "@/shared/utils/valibot-resolver";
import { ReactElement, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { tv } from "tailwind-variants";
import * as v from "valibot";

const classesSlots = tv({
  slots: {
    base: "modal",
  },
});

const schema = v.object({
  new_folder_name: v.pipe(
    v.string(),
    v.transform((input) => input.trim()),
    v.nonEmpty("Name is required"),
    noOnlySpacesStringSchema("Name cannot be only spaces"),
    v.maxLength(
      MAX_FOLDER_NAME_LENGTH,
      `Name cannot be longer than ${MAX_FOLDER_NAME_LENGTH} characters`,
    ),
  ),
});

type Inputs = v.InferOutput<typeof schema>;

interface Props {
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  folderId?: string;
}

export const ModalCreateFolder = (props: Props): ReactElement => {
  const classes = classesSlots();
  const nameFieldRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setError,
    reset,
  } = useForm<Inputs>({
    resolver: valibotResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await createFolder({
      name: data.new_folder_name,
      parentFolderId: props.folderId,
    });

    if (result.ok) {
      props.setIsOpen(false);
      await sleep(200);
      await revalidateGetDashboard();
      reset();
    } else {
      switch (result.data.statusCode) {
        case ErrorStatus.BAD_REQUEST: {
          parseBadRequestErrors(result.data.errors, ({ field, firstError }) => {
            switch (field) {
              case "name": {
                setError("new_folder_name", { message: firstError });
                break;
              }
            }
          });
          break;
        }

        case ErrorStatus.CONFLICT: {
          setError("new_folder_name", { message: result.data.message });
          break;
        }
      }
    }
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

  const nameRegister = register("new_folder_name", {
    required: true,
  });

  return (
    <dialog
      className={classes.base({ className: props.className })}
      open={props.isOpen}
      onClose={() => props.setIsOpen(false)}
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">Create Folder</h3>
        <p className="text-base-content/70 mt-4">
          A folder is used to group decks of cards and other folders.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="modal-action flex flex-col gap-4"
        >
          <InputLabeled
            {...nameRegister}
            ref={assignRef(nameRegister.ref, nameFieldRef)}
            error={errors.new_folder_name?.message}
            type="text"
            autoFocus={props.isOpen}
            tabIndex={-1}
            label="Name"
            data-1p-ignore="true"
            autoComplete="off"
          />

          <div className="mt-4 flex w-full justify-end gap-4">
            <Button
              className="btn-soft"
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                reset();
                props.setIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button className="btn-primary" isLoading={isSubmitting}>
              Create
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
