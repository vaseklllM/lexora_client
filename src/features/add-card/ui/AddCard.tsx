import { createCard } from "@/api/card/create-card";
import { Language } from "@/api/schemas/language.schema";
import { Card, CardSide } from "@/entities/card";
import { InputLabeled } from "@/entities/input-labeled";
import { ErrorStatus } from "@/shared/api-core/errorStatus";
import { parseBadRequestErrors } from "@/shared/api-core/parseBadRequestErrors";
import {
  MAX_CARD_DESCRIPTION_LENGTH,
  MAX_CARD_WORD_LENGTH,
} from "@/shared/config";
import { PlusIcon } from "@/shared/icons/Plus";
import { noOnlySpacesStringSchema } from "@/shared/schemas/noOnlySpacesString.schema";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { sleep } from "@/shared/utils/sleep";
import { valibotResolver } from "@/shared/utils/valibot-resolver";
import { memo, ReactElement, useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { tv } from "tailwind-variants";
import * as v from "valibot";

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

const schema = v.object({
  word: v.pipe(
    v.string(),
    noOnlySpacesStringSchema("Word is required"),
    v.custom(
      (value): value is string =>
        typeof value === "string" && value.trim().length > 1,
      "Word is too short",
    ),
    v.maxLength(
      MAX_CARD_WORD_LENGTH,
      `Word cannot be longer than ${MAX_CARD_WORD_LENGTH} characters`,
    ),
  ),
  translation: v.pipe(
    v.string(),
    noOnlySpacesStringSchema("Translation is required"),
    v.custom(
      (value): value is string =>
        typeof value === "string" && value.trim().length > 1,
      "Translation is too short",
    ),
    v.maxLength(
      MAX_CARD_WORD_LENGTH,
      `Translation cannot be longer than ${MAX_CARD_WORD_LENGTH} characters`,
    ),
  ),
  example: v.pipe(
    v.string(),
    v.maxLength(
      MAX_CARD_DESCRIPTION_LENGTH,
      `Example cannot be longer than ${MAX_CARD_DESCRIPTION_LENGTH} characters`,
    ),
  ),
  exampleTranslation: v.pipe(
    v.string(),
    v.maxLength(
      MAX_CARD_DESCRIPTION_LENGTH,
      `Example translation cannot be longer than ${MAX_CARD_DESCRIPTION_LENGTH} characters`,
    ),
  ),
});

type Inputs = v.InferOutput<typeof schema>;

interface Props {
  className?: string;
  languageWhatILearn: Language;
  languageWhatIKnow: Language;
  deckId: string;
}

export const AddCard = memo((props: Props): ReactElement => {
  const [activeSide, setActiveSide] = useState<CardSide>("front");

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    watch,
    setError,
  } = useForm<Inputs>({
    defaultValues: {
      word: "",
      translation: "",
      example: "",
      exampleTranslation: "",
    },
    resolver: valibotResolver(schema),
  });

  const classes = classesSlots({
    isSubmitting,
  });

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (inputs) => {
      const result = await createCard({
        deckId: props.deckId,
        textInKnownLanguage: inputs.word,
        textInLearningLanguage: inputs.translation,
        descriptionInKnownLanguage: inputs.example,
        descriptionInLearningLanguage: inputs.exampleTranslation,
      });

      if (result.ok) {
        await sleep(1000);
        setActiveSide("front");
        await sleep(400);
        reset();
      } else {
        switch (result.data.statusCode) {
          case ErrorStatus.BAD_REQUEST: {
            parseBadRequestErrors(
              result.data.errors,
              ({ field, firstError }) => {
                switch (field) {
                  case "textInKnownLanguage": {
                    setError("word", { message: firstError });
                    break;
                  }
                  case "textInLearningLanguage": {
                    setError("translation", { message: firstError });
                    break;
                  }

                  case "descriptionInKnownLanguage": {
                    setError("example", { message: firstError });
                    break;
                  }
                  case "descriptionInLearningLanguage": {
                    setError("exampleTranslation", { message: firstError });
                    break;
                  }
                }
              },
            );
            break;
          }

          // case ErrorStatus.CONFLICT: {
          //   setError("word", { message: result.data.message });
          //   break;
          // }
        }
      }
    },
    [props.deckId, setError],
  );

  const word = watch("word");
  const translation = watch("translation");

  const isWordChanged = word.trim() !== "" && word.trim().length > 1;
  const isTranslationChanged =
    translation.trim() !== "" && translation.trim().length > 1;

  return (
    <Card
      className={classes.card({ className: props.className })}
      activeSide={activeSide}
      onSideChange={setActiveSide}
      front={
        <div className={classes.front()}>
          <button
            className={classes.buttonAdd()}
            onClick={() => setActiveSide("back")}
            disabled={activeSide === "back"}
          >
            Add Card
            <PlusIcon />
          </button>
        </div>
      }
      back={
        <form onSubmit={handleSubmit(onSubmit)} className={classes.back()}>
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
                    activeSide === "front" || !isWordChanged || isSubmitting
                  }
                />
              }
              disabled={activeSide === "front" || isSubmitting}
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
                    activeSide === "front" ||
                    !isTranslationChanged ||
                    isSubmitting
                  }
                />
              }
              disabled={activeSide === "front" || isSubmitting}
            />
            <InputLabeled
              {...register("example")}
              error={errors.example?.message}
              label="Example or description"
              labelClassName={classes.backContentLabel()}
              placeholder={`${props.languageWhatILearn.name} example`}
              inputWrapperClassName={classes.backContentInputWrapper()}
              inputClassName={classes.backContentInput()}
              disabled={activeSide === "front" || isSubmitting}
            />
            <InputLabeled
              {...register("exampleTranslation")}
              error={errors.exampleTranslation?.message}
              label="Example or description translation"
              labelClassName={classes.backContentLabel()}
              placeholder={`${props.languageWhatIKnow.name} example`}
              inputWrapperClassName={classes.backContentInputWrapper()}
              inputClassName={classes.backContentInput()}
              disabled={activeSide === "front" || isSubmitting}
            />
          </div>
          <div className={classes.backButtons()}>
            <ButtonIcon
              className={classes.backButtonCancel()}
              icon="cancel"
              onClick={async () => {
                setActiveSide("front");
                await sleep(400);
                reset();
              }}
              disabled={activeSide === "front" || isSubmitting}
              variant="dash"
            />
            <ButtonIcon
              className={classes.backButtonSave()}
              icon="check"
              disabled={activeSide === "front" || isSubmitting}
              variant="dash"
              type="submit"
            />
          </div>
          {isSubmitting && <span className={classes.backLoader()}></span>}
        </form>
      }
    />
  );
});

AddCard.displayName = "AddCard";
