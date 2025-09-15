import { InputLabeled } from "@/entities/input-labeled";
import { deckService } from "@/shared/api/endpoints/deck/deck.service";
import { MAX_DECK_NAME_LENGTH } from "@/shared/config";
import { noOnlySpacesStringSchema } from "@/shared/schemas/noOnlySpacesString.schema";
import { Button } from "@/shared/ui/Button";
import { assignRef } from "@/shared/utils/assign-ref";
import { valibotResolver } from "@/shared/utils/valibot-resolver";
import { ReactElement, useCallback, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { tv } from "tailwind-variants";
import * as v from "valibot";

const schema = v.object({
  deck_name: v.pipe(
    v.string(),
    v.transform((input) => input.trim()),
    v.nonEmpty("Name is required"),
    noOnlySpacesStringSchema("Name cannot be only spaces"),
    v.maxLength(
      MAX_DECK_NAME_LENGTH,
      `Name cannot be longer than ${MAX_DECK_NAME_LENGTH} characters`,
    ),
  ),
});

type Inputs = v.InferOutput<typeof schema>;

const classesSlots = tv({
  slots: {
    base: "modal",
  },
});

interface Props {
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  ownerFolderId?: string;
}

export const ModalCreateDeck = (props: Props): ReactElement => {
  const classes = classesSlots();
  const nameFieldRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setError,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      deck_name: "",
    },
    resolver: valibotResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await deckService.create.fetch({
        name: data.deck_name,
        languageWhatIKnowCode: "en",
        languageWhatILearnCode: "uk",
        folderId: props.ownerFolderId,
      });
    } catch (error) {
      if (error instanceof Error) {
        setError("deck_name", { message: error.message });
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

  const closeHandler = useCallback(() => {
    props.setIsOpen(false);
  }, [props.setIsOpen]);

  const nameRegister = register("deck_name", {
    required: true,
  });

  return (
    <dialog
      id="my_modal_1"
      className={classes.base({ className: props.className })}
      open={props.isOpen}
      onClose={closeHandler}
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">Create Deck</h3>
        <p className="text-base-content/70 mt-4">
          A deck is used to store word cards and study them
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="modal-action flex flex-col gap-4"
        >
          <InputLabeled
            {...nameRegister}
            ref={assignRef(nameRegister.ref, nameFieldRef)}
            error={errors.deck_name?.message}
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
            <Button className="btn-primary" isLoading={isSubmitting}>
              Create
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
