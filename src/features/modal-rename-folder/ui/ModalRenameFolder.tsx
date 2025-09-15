import { InputLabeled } from "@/entities/input-labeled";
import { MAX_FOLDER_NAME_LENGTH } from "@/shared/config";
import { noOnlySpacesStringSchema } from "@/shared/schemas/noOnlySpacesString.schema";
import { Button } from "@/shared/ui/Button";
import { assignRef } from "@/shared/utils/assign-ref";
import { sleep } from "@/shared/utils/sleep";
import { valibotResolver } from "@/shared/utils/valibot-resolver";
import { ReactElement, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { tv } from "tailwind-variants";
import * as v from "valibot";
import { renameFolder } from "./renameFolder";
import { revalidate } from "./revalidate";

const classesSlots = tv({
  slots: {
    base: "modal",
  },
});

const schema = v.object({
  folder_name: v.pipe(
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
  folderId: string;
  folderName: string;
}

export const ModalRenameFolder = (props: Props): ReactElement => {
  const classes = classesSlots();
  const nameFieldRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setError,
    reset,
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      folder_name: props.folderName,
    },
    resolver: valibotResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await renameFolder({
        name: data.folder_name.trim(),
        folderId: props.folderId,
      });
      props.setIsOpen(false);
      await sleep(200);
      revalidate();
      reset();
    } catch (error) {
      if (error instanceof Error) {
        setError("folder_name", { message: error.message });
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

  const nameRegister = register("folder_name", {
    required: true,
  });

  const isNameChanged = watch("folder_name").trim() !== props.folderName;

  return (
    <dialog
      className={classes.base({ className: props.className })}
      open={props.isOpen}
      onClose={() => props.setIsOpen(false)}
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">Create Folder</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="modal-action flex flex-col gap-4"
        >
          <InputLabeled
            {...nameRegister}
            ref={assignRef(nameRegister.ref, nameFieldRef)}
            error={errors.folder_name?.message}
            type="text"
            autoComplete="name"
            autoFocus={props.isOpen}
            tabIndex={-1}
            label="Name"
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
            <Button
              className="btn-primary"
              isLoading={isSubmitting}
              disabled={!isNameChanged}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
