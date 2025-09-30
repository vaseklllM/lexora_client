"use client";

import { revalidateGetDeck } from "@/api/deck/get-deck";
import { renameDeck } from "@/api/deck/rename-deck";
import { ICard } from "@/api/schemas/card.schema";
import { IDeck } from "@/api/schemas/deck.schema";
import { IFolderBreadcrumb } from "@/api/schemas/folder-breadcrumb.schema";
import {
  EditableText,
  EditableTextError,
  EditableTextSaveHandler,
} from "@/entities/editable-text";
import { FolderBreadcrumbs } from "@/entities/folder-breadcrumbs";
import { AddCard } from "@/features/add-card";
import { ButtonBack } from "@/features/button-back";
import { ViewCard } from "@/features/view-card";
import { ErrorStatus } from "@/shared/api-core/errorStatus";
import { parseBadRequestErrors } from "@/shared/api-core/parseBadRequestErrors";
import { routes } from "@/shared/routes";
import { Breadcrumb } from "@/shared/ui/Breadcrumbs";
import { ReactElement, useCallback, useMemo } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "bg-base-200 relative rounded-xl p-5 shadow-md",
    header: "flex items-center gap-6",
    buttonBack: "",
    breadcrumbs: "",
    name: "mt-4",
    language: "mt-4",
    cardsTitle: "text-base-content/70 mt-6 text-xl font-bold",
    emptyCards: "text-base-content/50 text-md mt-16 mb-20 text-center",
    cards:
      "bg-base-300 mt-4 grid grid-cols-1 gap-6 rounded-xl p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
  },
});

interface Props {
  className?: string;
  foldersBreadcrumbs: IFolderBreadcrumb[];
  deck: IDeck;
  cards: ICard[];
}

export const DeckSection = (props: Props): ReactElement => {
  const classes = classesSlots();

  const lastBreadcrumb = useMemo<Breadcrumb>(() => {
    return {
      icon: "deck",
      title: `${props.deck.name} ${props.deck.languageWhatILearn.iconSymbol}`,
      url: routes.dashboard.deck.url(props.deck.id),
    };
  }, [props.deck.id, props.deck.name]);

  const saveDeckName = useCallback<EditableTextSaveHandler>(async (name) => {
    const result = await renameDeck({
      deckId: props.deck.id,
      name,
    });
    if (result.ok) {
      await revalidateGetDeck(props.deck.id);
    } else {
      switch (result.data.statusCode) {
        case ErrorStatus.BAD_REQUEST: {
          parseBadRequestErrors(result.data.errors, ({ field, firstError }) => {
            switch (field) {
              case "name": {
                throw new EditableTextError(firstError);
              }
            }
          });
          break;
        }

        case ErrorStatus.CONFLICT: {
          throw new EditableTextError(result.data.message);
        }
      }
    }
  }, []);

  return (
    <div className={classes.base({ className: props.className })}>
      <div className={classes.header()}>
        <ButtonBack
          foldersBreadcrumbs={props.foldersBreadcrumbs}
          className={classes.buttonBack()}
        />
        <FolderBreadcrumbs
          className={classes.breadcrumbs()}
          breadcrumbs={props.foldersBreadcrumbs}
          lastItem={lastBreadcrumb}
        />
      </div>
      <EditableText
        text={props.deck.name}
        className={classes.name()}
        placeholder="Enter deck name"
        onSave={saveDeckName}
      />
      <div className="divider"></div>
      <p className={classes.language()}>
        <span className="text-base-content/70">I learn:</span>{" "}
        {props.deck.languageWhatILearn.name}{" "}
        {props.deck.languageWhatILearn.iconSymbol}
      </p>
      <p className={classes.language()}>
        <span className="text-base-content/70">I know:</span>{" "}
        {props.deck.languageWhatIKnow.name}{" "}
        {props.deck.languageWhatIKnow.iconSymbol}
      </p>
      <div className="divider"></div>
      <h3 className={classes.cardsTitle()}>Cards</h3>
      <div className={classes.cards()}>
        <AddCard
          languageWhatILearn={props.deck.languageWhatILearn}
          languageWhatIKnow={props.deck.languageWhatIKnow}
          deckId={props.deck.id}
        />
        {props.cards.map((card) => (
          <ViewCard
            key={card.id}
            card={card}
            deckId={props.deck.id}
            languageWhatILearn={props.deck.languageWhatILearn}
            languageWhatIKnow={props.deck.languageWhatIKnow}
          />
        ))}
      </div>
    </div>
  );
};
