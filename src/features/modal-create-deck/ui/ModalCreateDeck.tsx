import { revalidateGetDashboard } from "@/api/dashboard/get-dashboard";
import { createDeck } from "@/api/deck/create-deck";
import { Language } from "@/api/schemas/language.schema";
import { InputLabeled } from "@/entities/input-labeled";
import { LanguagesSelect } from "@/entities/languages-select";
import { parseBadRequestError } from "@/shared/api-core/parseBadRequestError";
import { MAX_DECK_NAME_LENGTH } from "@/shared/config";
import { noOnlySpacesStringSchema } from "@/shared/schemas/noOnlySpacesString.schema";
import { Button } from "@/shared/ui/Button";
import { assignRef } from "@/shared/utils/assign-ref";
import { sleep } from "@/shared/utils/sleep";
import { valibotResolver } from "@/shared/utils/valibot-resolver";
import { ReactElement, useCallback, useEffect, useMemo, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { tv } from "tailwind-variants";
import * as v from "valibot";

const schema = v.object({
  name: v.pipe(
    v.string(),
    v.transform((input) => input.trim()),
    v.nonEmpty("Name is required"),
    noOnlySpacesStringSchema("Name cannot be only spaces"),
    v.maxLength(
      MAX_DECK_NAME_LENGTH,
      `Name cannot be longer than ${MAX_DECK_NAME_LENGTH} characters`,
    ),
  ),
  languageWhatIKnowCode: v.string(),
  languageWhatILearnCode: v.string(),
});

export type Inputs = v.InferOutput<typeof schema>;

const classesSlots = tv({
  slots: {
    base: "modal",
  },
});

interface Props {
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  folderId?: string;
  allLanguages: Language[];
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
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      languageWhatIKnowCode: props.allLanguages[0].code,
      languageWhatILearnCode: props.allLanguages[1].code,
    },
    resolver: valibotResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await createDeck({
        name: data.name,
        languageWhatIKnowCode: data.languageWhatIKnowCode,
        languageWhatILearnCode: data.languageWhatILearnCode,
        folderId: props.folderId,
      });
      props.setIsOpen(false);
      await sleep(200);
      await revalidateGetDashboard();
      reset();
    } catch (error) {
      if (error instanceof Error) {
        parseBadRequestError<"name">(error, ({ field, firstError }) => {
          switch (field) {
            case "name": {
              setError("name", { message: firstError });
              break;
            }
          }
        });
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

  const nameRegister = register("name", {
    required: true,
  });

  const languageWhatIKnow = watch("languageWhatIKnowCode");
  const languageWhatILearn = watch("languageWhatILearnCode");

  const disabledLanguagesWhatIKnow = useMemo(() => {
    return [languageWhatILearn];
  }, [languageWhatILearn]);

  const disabledLanguagesWhatILearn = useMemo(() => {
    return [languageWhatIKnow];
  }, [languageWhatIKnow]);

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
            error={errors.name?.message}
            type="text"
            autoComplete="name"
            autoFocus={props.isOpen}
            tabIndex={-1}
            label="Name"
          />

          <LanguagesSelect
            {...register("languageWhatIKnowCode")}
            label="Language I know"
            languages={props.allLanguages}
            className="w-full"
            disabledLanguages={disabledLanguagesWhatIKnow}
          />

          <LanguagesSelect
            {...register("languageWhatILearnCode")}
            languages={props.allLanguages}
            className="w-full"
            label="Language I learn"
            disabledLanguages={disabledLanguagesWhatILearn}
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
