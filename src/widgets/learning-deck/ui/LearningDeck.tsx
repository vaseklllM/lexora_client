"use client";

import { IDeck } from "@/api/schemas/deck.schema";
import { IFolderBreadcrumb } from "@/api/schemas/folder-breadcrumb.schema";
import { FolderBreadcrumbs } from "@/entities/folder-breadcrumbs";
import { ButtonBack } from "@/features/button-back";
import { player } from "@/shared/hooks/usePlayer";
import { useEffect } from "react";
import { tv } from "tailwind-variants";
import { useLearningDeckStore } from "../model/store";
import { StepComponent } from "./Step";
import { useLastBreadcrumbs } from "./useLastBreadcrumbs";

const classesSlots = tv({
  slots: {
    base: "bg-base-200 relative p-4 shadow-md sm:rounded-xl sm:p-5 sm:pr-5 sm:pb-15 sm:pl-5",
    header: "flex items-center gap-6",
    step: "mt-6",
  },
});

export interface LearningDeckProps {
  foldersBreadcrumbs: IFolderBreadcrumb[];
  deck: IDeck;
}

export function LearningDeck(props: LearningDeckProps) {
  const classes = classesSlots();
  const lastBreadcrumb = useLastBreadcrumbs(props);
  const reset = useLearningDeckStore((state) => state.reset);

  useEffect(() => {
    return () => {
      reset();
      player.stop();
    };
  }, []);

  return (
    <div className={classes.base()}>
      <div className={classes.header()}>
        <ButtonBack foldersBreadcrumbs={props.foldersBreadcrumbs} />
        <FolderBreadcrumbs
          breadcrumbs={props.foldersBreadcrumbs}
          lastItem={lastBreadcrumb}
        />
      </div>
      <StepComponent deck={props.deck} className={classes.step()} />
    </div>
  );
}
