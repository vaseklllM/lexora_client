import { InputLabeled } from "@/entities/input-labeled";
import { noOnlySpacesStringSchema } from "@/shared/schemas/noOnlySpacesString.schema";
import { Button } from "@/shared/ui/Button";
import { valibotResolver } from "@/shared/utils/valibot-resolver";
import { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { tv } from "tailwind-variants";
import * as v from "valibot";
import { createFolder } from "./createFolder";

const classesSlots = tv({
  slots: {
    base: "modal",
  },
});

const schema = v.object({
  name: v.pipe(
    v.string(),
    v.nonEmpty("Name is required"),
    noOnlySpacesStringSchema("Name cannot be only spaces"),
  ),
});

type Inputs = v.InferOutput<typeof schema>;

interface Props {
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ModalCreateFolder = (props: Props): ReactElement => {
  const classes = classesSlots();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setError,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
    },
    resolver: valibotResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await createFolder({
        name: data.name,
      });
      props.setIsOpen(false);
      reset();
    } catch (error) {
      if (error instanceof Error) {
        setError("name", { message: error.message });
      }
    }
  };

  return (
    <dialog
      id="my_modal_1"
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
            {...register("name", {
              required: true,
            })}
            id="name"
            name="name"
            error={errors.name?.message}
            type="text"
            autoComplete="name"
            label="Name"
          />

          <div className="mt-4 flex w-full justify-end gap-4">
            <Button
              className="btn-soft"
              disabled={isSubmitting}
              onClick={() => {
                props.setIsOpen(false);
                reset();
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
