"use client";

import { ICard } from "@/api/schemas/card.schema";
import { memo, ReactElement } from "react";
import { tv } from "tailwind-variants";
import { withStoreProvider } from "../model/store";
import { CardItem } from "./CardItem";
import { InputField } from "./InputField";

const classesSlots = tv({
  slots: {
    base: "",
    content: "grid h-full w-full grid-cols-1 gap-4",
    inputWrapper: "",
  },
});

export interface TypeItGameProps {
  className?: string;
  cards: ICard[];
  onFinish?: () => void;
}

export const TypeItGame = memo(
  withStoreProvider(function Component(props: TypeItGameProps): ReactElement {
    const classes = classesSlots();

    return (
      <div className={classes.base({ className: props.className })}>
        <div className={classes.content()}>
          <CardItem />
          <div className={classes.inputWrapper()}>
            <InputField />
          </div>
        </div>
      </div>
    );
  }),
);
