import { routes } from "@/shared/routes";
import { Breadcrumb } from "@/shared/ui/Breadcrumbs";
import { useMemo } from "react";
import { LearningDeckProps } from "./LearningDeck";
import { useTranslation } from "@/shared/hooks/useTranslation";

export function useLastBreadcrumbs(props: LearningDeckProps) {
  const { t } = useTranslation();

  return useMemo<Breadcrumb[]>(() => {
    return [
      {
        icon: "deck",
        title: `${props.deck.name} ${props.deck.languageWhatILearn.iconSymbol}`,
        url: routes.dashboard.deck.url(props.deck.id),
      },
      {
        title: t("learning_deck.breadcrumbs.learning_deck"),
        url: routes.dashboard.learningDeck.url(props.deck.id),
      },
    ];
  }, [
    props.deck.id,
    props.deck.name,
    props.deck.languageWhatILearn.iconSymbol,
  ]);
}
