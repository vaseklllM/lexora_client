"use client";

import { ICard } from "@/api/schemas/card.schema";
import { memo, ReactElement } from "react";
import { tv } from "tailwind-variants";
import { useTypeItGameStore, withStoreProvider } from "../model/store";
import { ButtonCheck } from "./ButtonCheck";
import { ButtonHelp } from "./ButtonHelp";
import { ButtonRight } from "./ButtonRight";
import { ButtonTryAgain } from "./ButtonTryAgain";
import { CardItem } from "./CardItem";
import { InputField } from "./InputField";

const classesSlots = tv({
  slots: {
    base: "flex h-full w-full flex-col gap-4",
    inputWrapper: "flex w-full flex-col items-center",
    buttons:
      "mt-4 grid w-full grid-cols-2 gap-4 transition-opacity duration-1000 md:mt-24 md:w-max",
    button: "md:min-w-48",
  },
  variants: {
    isVisibleButtons: {
      true: {
        buttons: "opacity-100",
      },
      false: {
        buttons: "opacity-0",
      },
    },
  },
});

export interface TypeItGameProps {
  className?: string;
  cards: ICard[];
  onFinish?: () => void;
}

export const TypeItGame = memo(
  withStoreProvider(function Component(props: TypeItGameProps): ReactElement {
    const isVisibleButtons = useTypeItGameStore(
      (state) => state.isVisibleButtons,
    );

    const classes = classesSlots({
      isVisibleButtons,
    });

    const buttonsVariant = useTypeItGameStore((state) => state.buttonsVariant);

    return (
      <div className={classes.base({ className: props.className })}>
        <CardItem />
        <div className={classes.inputWrapper()}>
          <InputField />
          {buttonsVariant === "default" && (
            <div className={classes.buttons()}>
              <ButtonHelp className={classes.button()} />
              <ButtonCheck className={classes.button()} />
            </div>
          )}
          {buttonsVariant === "unrightAnswer" && (
            <div className={classes.buttons()}>
              <ButtonRight className={classes.button()} />
              <ButtonTryAgain className={classes.button()} />
            </div>
          )}
        </div>
      </div>
    );
  }),
);
