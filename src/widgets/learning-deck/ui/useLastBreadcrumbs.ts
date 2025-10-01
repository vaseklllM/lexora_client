import { routes } from "@/shared/routes";
import { Breadcrumb } from "@/shared/ui/Breadcrumbs";
import { useMemo } from "react";
import { LearningDeckProps } from "./LearningDeck";

export function useLastBreadcrumbs(props: LearningDeckProps) {
  return useMemo<Breadcrumb[]>(() => {
    return [
      {
        icon: "deck",
        title: `${props.deck.name} ${props.deck.languageWhatILearn.iconSymbol}`,
        url: routes.dashboard.deck.url(props.deck.id),
      },
      {
        title: "Learning deck",
        url: routes.dashboard.learningDeck.url(props.deck.id),
      },
    ];
  }, [
    props.deck.id,
    props.deck.name,
    props.deck.languageWhatILearn.iconSymbol,
  ]);
}
