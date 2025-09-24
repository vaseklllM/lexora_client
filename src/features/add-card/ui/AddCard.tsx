import { Language } from "@/api/schemas/language.schema";
import { Card, CardSide } from "@/entities/card";
import { InputLabeled } from "@/entities/input-labeled";
import { PlusIcon } from "@/shared/icons/Plus";
import { noOnlySpacesStringSchema } from "@/shared/schemas/noOnlySpacesString.schema";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { sleep } from "@/shared/utils/sleep";
import { valibotResolver } from "@/shared/utils/valibot-resolver";
import { memo, ReactElement, useState } from "react";
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
  ),
  translation: v.pipe(
    v.string(),
    noOnlySpacesStringSchema("Translation is required"),
    v.custom(
      (value): value is string =>
        typeof value === "string" && value.trim().length > 1,
      "Translation is too short",
    ),
  ),
  example: v.string(),
  exampleTranslation: v.string(),
});

export type Inputs = v.InferOutput<typeof schema>;

interface Props {
  className?: string;
  languageWhatILearn: Language;
  languageWhatIKnow: Language;
}

export const AddCard = memo((props: Props): ReactElement => {
  const [activeSide, setActiveSide] = useState<CardSide>("front");

  const classes = classesSlots();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      word: "",
      translation: "",
      example: "",
      exampleTranslation: "",
    },
    resolver: valibotResolver(schema),
  });

  const isSubmitting = true;

  const onSubmit: SubmitHandler<Inputs> = async () => {
    setActiveSide("front");
  };

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
        </form>
      }
    />
  );
});

AddCard.displayName = "AddCard";
