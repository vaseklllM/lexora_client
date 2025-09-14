import { InputLabeled } from "@/entities/input-labeled";
import { Button } from "@/shared/ui/Button";
import { valibotResolver } from "@/shared/utils/valibot-resolver";
import { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { tv } from "tailwind-variants";
import * as v from "valibot";

const classesSlots = tv({
  slots: {
    base: "modal",
  },
});

const schema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Name is required")),
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
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
    },
    resolver: valibotResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async () => {};

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

          <div className="mt-4 flex w-full justify-end gap-2">
            <Button
              className="btn-soft"
              isLoading={isSubmitting}
              onClick={() => props.setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="btn-primary"
              isLoading={isSubmitting}
              onClick={(e) => {
                e.preventDefault();
                // Add your create folder logic here
              }}
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
