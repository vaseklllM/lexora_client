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
import { Progress } from "@/entities/progress";
import { AddCard } from "@/features/add-card";
import { ButtonBack } from "@/features/button-back";
import { ViewCard } from "@/features/view-card";
import { ErrorStatus } from "@/shared/api-core/errorStatus";
import { parseBadRequestErrors } from "@/shared/api-core/parseBadRequestErrors";
import { routes } from "@/shared/routes";
import { Breadcrumb } from "@/shared/ui/Breadcrumbs";
import { Chip } from "@/shared/ui/chip";
import { countOf } from "@/shared/utils/count-of";
import { ReactElement, useCallback, useMemo } from "react";
import { tv } from "tailwind-variants";
import { ButtonPlay } from "./ButtonPlay";

const classesSlots = tv({
  slots: {
    base: "bg-base-200 relative shadow-md sm:rounded-xl sm:p-5",
    headerSection: "px-5 pt-5 sm:p-0 sm:pt-0",
    header: "flex items-center gap-6",
    progressWrapper: "mt-6 flex items-center justify-start gap-4",
    progress: "progress progress-primary opacity-80",
    languagesList: "mt-6 flex flex-col gap-3",
    buttonBack: "",
    breadcrumbs: "",
    name: "mt-6",
    language: "",
    emptyCards: "text-base-content/50 text-md mt-16 mb-20 text-center",
    cards:
      "bg-base-300 mt-6 grid grid-cols-1 gap-6 p-5 p-6 sm:rounded-xl md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
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
      <div className={classes.headerSection()}>
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
        <div className={classes.languagesList()}>
          <p className={classes.language()}>
            <span className="text-base-content/70">I learn:</span>{" "}
            <Chip>
              {props.deck.languageWhatILearn.name}{" "}
              {props.deck.languageWhatILearn.iconSymbol}
            </Chip>
          </p>
          <p className={classes.language()}>
            <span className="text-base-content/70">I know:</span>{" "}
            <Chip>
              {props.deck.languageWhatIKnow.name}{" "}
              {props.deck.languageWhatIKnow.iconSymbol}
            </Chip>
          </p>
        </div>
        <div className={classes.progressWrapper()}>
          <Progress
            percent={props.deck.masteryScore}
            progressOf={countOf(props.deck.numberOfCards, "card")}
            disabled={props.deck.numberOfCards <= 0}
          />
          <ButtonPlay deckId={props.deck.id} />
        </div>
      </div>
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
