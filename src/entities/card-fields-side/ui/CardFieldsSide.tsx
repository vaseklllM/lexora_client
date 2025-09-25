import { Language } from "@/api/schemas/language.schema";
import { InputLabeled } from "@/entities/input-labeled";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { valibotResolver } from "@/shared/utils/valibot-resolver";
import { ReactElement, useCallback } from "react";
import { useForm, UseFormSetError } from "react-hook-form";
import { tv } from "tailwind-variants";
import { CardFields, cardFieldsSchema } from "../model/cardFields.schema";

const classesSlots = tv({
  slots: {
    card: "",
    front: "flex h-full w-full items-center justify-center",
    buttonAdd: "btn btn-dash btn-primary rounded-full font-light",
    back: "flex h-full w-full flex-col justify-between",
    backContent: "flex flex-col justify-between gap-4 p-1",
    backContentLabel: "text-base-content/70 text-left text-xs",
    backContentInputWrapper: "mt-1",
    backContentInput: "",
    backButtons: "flex justify-between gap-2",
    backButtonCancel: "btn-dash",
    backButtonSave: "btn-dash",
    backLoader:
      "loading loading-spinner text-primary loading-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  },
  variants: {
    isSubmitting: {
      true: {
        backContent: "opacity-30",
      },
    },
  },
});

export type CardFieldsSideSubmitHandler = (args: {
  reset: () => void;
  inputs: CardFields;
  setError: UseFormSetError<CardFields>;
}) => void;

export type CardFieldsSideCancelHandler = (args: { reset: () => void }) => void;

export interface CardFieldsSideProps {
  className?: string;
  languageWhatILearn: Language;
  languageWhatIKnow: Language;
  isActiveThisSide: boolean;
  onSubmit?: CardFieldsSideSubmitHandler;
  onCancel?: CardFieldsSideCancelHandler;
  defaultValues?: Partial<CardFields>;
}

export const CardFieldsSide = (props: CardFieldsSideProps): ReactElement => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    watch,
    setError,
  } = useForm<CardFields>({
    defaultValues: {
      word: props.defaultValues?.word || "",
      translation: props.defaultValues?.translation || "",
      example: props.defaultValues?.example || "",
      exampleTranslation: props.defaultValues?.exampleTranslation || "",
    },
    resolver: valibotResolver(cardFieldsSchema),
  });

  const classes = classesSlots({
    isSubmitting,
  });

  const word = watch("word");
  const translation = watch("translation");

  const isWordChanged = word.trim() !== "" && word.trim().length > 1;
  const isTranslationChanged =
    translation.trim() !== "" && translation.trim().length > 1;

  const submitHandler = useCallback(
    (inputs: CardFields) => {
      props.onSubmit?.({ reset, inputs, setError });
    },
    [props.onSubmit, reset, setError],
  );

  const cancelHandler = useCallback(() => {
    props.onCancel?.({ reset });
  }, [props.onCancel, reset]);

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={classes.back()}>
      <div className={classes.backContent()}>
        <InputLabeled
          {...register("word")}
          error={errors.word?.message}
          label="Word"
          labelClassName={classes.backContentLabel()}
          placeholder={`${props.languageWhatILearn.name}`}
          inputWrapperClassName={classes.backContentInputWrapper()}
          inputClassName={classes.backContentInput()}
          required
          actionButton={
            <ButtonIcon
              icon="ai"
              variant="ghost"
              disabled={
                !props.isActiveThisSide || !isWordChanged || isSubmitting
              }
              textColor="primary"
            />
          }
          disabled={!props.isActiveThisSide || isSubmitting}
        />
        <InputLabeled
          {...register("translation")}
          error={errors.translation?.message}
          label="Translation"
          labelClassName={classes.backContentLabel()}
          placeholder={`${props.languageWhatIKnow.name}`}
          inputWrapperClassName={classes.backContentInputWrapper()}
          inputClassName={classes.backContentInput()}
          required
          actionButton={
            <ButtonIcon
              icon="ai"
              variant="ghost"
              disabled={
                !props.isActiveThisSide || !isTranslationChanged || isSubmitting
              }
              textColor="primary"
            />
          }
          disabled={!props.isActiveThisSide || isSubmitting}
        />
        <InputLabeled
          {...register("example")}
          error={errors.example?.message}
          label="Example or description"
          labelClassName={classes.backContentLabel()}
          placeholder={`${props.languageWhatILearn.name} example`}
          inputWrapperClassName={classes.backContentInputWrapper()}
          inputClassName={classes.backContentInput()}
          disabled={!props.isActiveThisSide || isSubmitting}
        />
        <InputLabeled
          {...register("exampleTranslation")}
          error={errors.exampleTranslation?.message}
          label="Example or description translation"
          labelClassName={classes.backContentLabel()}
          placeholder={`${props.languageWhatIKnow.name} example`}
          inputWrapperClassName={classes.backContentInputWrapper()}
          inputClassName={classes.backContentInput()}
          disabled={!props.isActiveThisSide || isSubmitting}
        />
      </div>
      <div className={classes.backButtons()}>
        <ButtonIcon
          className={classes.backButtonCancel()}
          icon="cancel"
          onClick={cancelHandler}
          disabled={!props.isActiveThisSide || isSubmitting}
          variant="dash"
          color="error"
        />
        <ButtonIcon
          className={classes.backButtonSave()}
          icon="check"
          disabled={!props.isActiveThisSide || isSubmitting}
          variant="dash"
          type="submit"
          color="success"
        />
      </div>
      {isSubmitting && <span className={classes.backLoader()} />}
    </form>
  );
};
