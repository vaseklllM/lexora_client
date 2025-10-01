import { IDeck } from "@/api/schemas/deck.schema";
import { Deck } from "@/features/deck";
import { DragOverlay, DropAnimation, useDndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { memo, ReactElement } from "react";

const dropAnimationConfig: DropAnimation = {
  keyframes({ transform }) {
    return [
      {
        transform: CSS.Transform.toString({
          ...transform.initial,
          // scaleX: 1.06,
          // scaleY: 1.06,
        }),
        boxShadow:
          "-1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)",
      },

      {
        transform: CSS.Transform.toString({
          ...transform.final,
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
        }),
        boxShadow:
          "-1px 0 15px 0 rgba(34, 33, 81, 0), 0px 15px 15px 0 rgba(34, 33, 81, 0)",
      },
    ];
  },
  sideEffects({ active, dragOverlay }) {
    active.node.style.opacity = "0";

    const div = dragOverlay.node.querySelector("div");

    if (div) {
      div.animate(
        [
          {
            boxShadow:
              "-1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)",
            transform: "scale(1.06)",
          },
          {
            boxShadow: "0 0 0 0 rgba(34, 33, 81, 0)",
            transform: "scale(1)",
          },
        ],
        {
          duration: 250,
          easing: "ease",
          fill: "forwards",
        },
      );
    }

    return () => {
      active.node.style.opacity = "";
    };
  },
};

interface Props {
  className?: string;
  deck?: IDeck;
}

export const DeckDraggableOverlay = memo((props: Props): ReactElement => {
  const { active } = useDndContext();

  return (
    <DragOverlay dropAnimation={dropAnimationConfig}>
      {active && <Deck deck={props.deck!} isDragging dragOverlay />}
    </DragOverlay>
  );
});

DeckDraggableOverlay.displayName = "DeckDraggableOverlay";
