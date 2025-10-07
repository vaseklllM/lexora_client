"use client";

import { ICard } from "@/api/schemas/card.schema";
import { memo, ReactElement } from "react";
import { tv } from "tailwind-variants";
import { withStoreProvider } from "../model/store";
import { Buttons } from "./Buttons";
import { CardItem } from "./CardItem";
import { InputField } from "./InputField";

const classesSlots = tv({
  slots: {
    base: "flex h-full w-full flex-col gap-4",
    inputWrapper: "flex w-full flex-col items-center",
    buttons: "",
  },
});

export interface TypeItGameProps {
  className?: string;
  cards: ICard[];
  onFinish?: () => void;
}

export const TypeItGame = memo(
  withStoreProvider(function Component(props: TypeItGameProps): ReactElement {
    const classes = classesSlots({});

    return (
      <div className={classes.base({ className: props.className })}>
        <CardItem />
        <div className={classes.inputWrapper()}>
          <InputField />
          <Buttons />
        </div>
      </div>
    );
  }),
);
