"use client";

import { fillCardData } from "@/api/ai/fill-card-data";
import { CefrEnum } from "@/api/schemas/card.schema";
import { Language } from "@/api/schemas/language.schema";
import { InputLabeled } from "@/entities/input-labeled";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { valibotResolver } from "@/shared/utils/valibot-resolver";
import { ReactElement, useCallback, useState } from "react";
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
    isLoading: {
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
  deckId: string;
}

export const CardFieldsSide = (props: CardFieldsSideProps): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    watch,
    setError,
    setValue,
  } = useForm<CardFields>({
    defaultValues: {
      word: props.defaultValues?.word || "",
      translation: props.defaultValues?.translation || "",
      example: props.defaultValues?.example || "",
      exampleTranslation: props.defaultValues?.exampleTranslation || "",
      cefr: props.defaultValues?.cefr || CefrEnum.A1,
    },
    resolver: valibotResolver(cardFieldsSchema),
  });

  const classes = classesSlots({
    isLoading: isSubmitting || isLoading,
  });

  const word = watch("word");

  const isWordChanged = word.trim() !== "" && word.trim().length >= 1;

  const submitHandler = useCallback(
    async (inputs: CardFields) => {
      await props.onSubmit?.({ reset, inputs, setError });
    },
    [props.onSubmit, reset, setError],
  );

  const cancelHandler = useCallback(() => {
    props.onCancel?.({ reset });
  }, [props.onCancel, reset]);

  const aiWordHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await fillCardData({
        deckId: props.deckId,
        textInLearningLanguage: word,
      });
      if (result.ok) {
        setValue("word", result.data.textInLearningLanguage);
        setValue("translation", result.data.textInKnownLanguage);
        setValue("example", result.data.descriptionInLearningLanguage);
        setValue("exampleTranslation", result.data.descriptionInKnownLanguage);
        setValue("cefr", result.data.cefr);
      }
    } finally {
      setIsLoading(false);
    }
  }, [props.deckId, word, setIsLoading]);

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={classes.back()}>
      <div className={classes.backContent()}>
        <InputLabeled
          {...register("word")}
          error={errors.word?.message}
          label={t("deck_section.card_fields_side.word.label")}
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
                !props.isActiveThisSide ||
                !isWordChanged ||
                isSubmitting ||
                isLoading
              }
              textColor="primary"
              tooltip={t("deck_section.card_fields_side.word.generate.tooltip")}
              onClick={aiWordHandler}
            />
          }
          disabled={!props.isActiveThisSide || isSubmitting || isLoading}
        />
        <InputLabeled
          {...register("translation")}
          error={errors.translation?.message}
          label={t("deck_section.card_fields_side.translation.label")}
          labelClassName={classes.backContentLabel()}
          placeholder={`${props.languageWhatIKnow.name}`}
          inputWrapperClassName={classes.backContentInputWrapper()}
          inputClassName={classes.backContentInput()}
          required
          disabled={!props.isActiveThisSide || isSubmitting || isLoading}
        />
        <fieldset className="fieldset w-max min-w-20">
          <legend className="fieldset-legend text-base-content/70 p-0 pb-1 text-left text-xs font-medium">
            CEFR
          </legend>
          <select {...register("cefr")} className="select">
            <option>{CefrEnum.A1}</option>
            <option>{CefrEnum.A2}</option>
            <option>{CefrEnum.B1}</option>
            <option>{CefrEnum.B2}</option>
            <option>{CefrEnum.C1}</option>
            <option>{CefrEnum.C2}</option>
          </select>
        </fieldset>
        <InputLabeled
          {...register("example")}
          error={errors.example?.message}
          label={t("deck_section.card_fields_side.example.label")}
          labelClassName={classes.backContentLabel()}
          placeholder={t("deck_section.card_fields_side.example.placeholder", {
            languageName: props.languageWhatILearn.name,
          })}
          inputWrapperClassName={classes.backContentInputWrapper()}
          inputClassName={classes.backContentInput()}
          disabled={!props.isActiveThisSide || isSubmitting || isLoading}
        />
        <InputLabeled
          {...register("exampleTranslation")}
          error={errors.exampleTranslation?.message}
          label={t("deck_section.card_fields_side.example_translation.label")}
          labelClassName={classes.backContentLabel()}
          placeholder={t(
            "deck_section.card_fields_side.example_translation.placeholder",
            {
              languageName: props.languageWhatIKnow.name,
            },
          )}
          inputWrapperClassName={classes.backContentInputWrapper()}
          inputClassName={classes.backContentInput()}
          disabled={!props.isActiveThisSide || isSubmitting || isLoading}
        />
      </div>
      <div className={classes.backButtons()}>
        <ButtonIcon
          className={classes.backButtonCancel()}
          icon="cancel"
          onClick={cancelHandler}
          disabled={!props.isActiveThisSide || isSubmitting || isLoading}
          variant="dash"
          color="error"
        />
        <ButtonIcon
          className={classes.backButtonSave()}
          icon="check"
          disabled={!props.isActiveThisSide || isSubmitting || isLoading}
          variant="dash"
          type="submit"
          color="success"
        />
      </div>
      {(isSubmitting || isLoading) && <span className={classes.backLoader()} />}
    </form>
  );
};
