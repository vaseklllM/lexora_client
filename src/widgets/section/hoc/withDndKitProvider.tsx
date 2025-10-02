"use client";

import { revalidateGetDeck } from "@/api/deck/get-deck";
import { moveDeck } from "@/api/deck/move-deck";
import { Alert } from "@/shared/ui/Alert";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { memo, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useSectionStore } from "../model/store";
import { SectionProps } from "../ui/Section";

export function withDndKitProvider(
  Component: React.ComponentType<SectionProps>,
) {
  return memo(function Provider(props: SectionProps) {
    const setDraggingDeckId = useSectionStore(
      (store) => store.setDraggingDeckId,
    );
    const addMovedDeckId = useSectionStore((store) => store.addMovedDeckId);
    const clearMovedDeckIds = useSectionStore(
      (store) => store.clearMovedDeckIds,
    );

    const touchSensor = useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 8,
      },
    });

    const mouseSensor = useSensor(MouseSensor, {
      activationConstraint: {
        delay: 250,
        distance: 1,
      },
    });

    const sensors = useSensors(mouseSensor, touchSensor);

    useEffect(() => {
      clearMovedDeckIds();
    }, [props.folder?.id]);

    const dragStartHandler = useCallback((event: DragStartEvent) => {
      if (typeof event.active.id === "string") {
        setDraggingDeckId(event.active.id);
      }
    }, []);

    const dragEndHandler = useCallback(async (args: DragEndEvent) => {
      if (
        typeof args.over?.id === "string" &&
        typeof args.active.id === "string"
      ) {
        const deckId = args.active.id as string;
        const toFolderId = args.over.id as string;

        const result = await moveDeck({
          deckId,
          toFolderId: toFolderId === "home" ? undefined : toFolderId,
        });
        if (result.ok) {
          await revalidateGetDeck(deckId);
          addMovedDeckId(deckId);
        } else {
          toast(<Alert message={result.data.message} type="error" />, {
            hideProgressBar: true,
          });
        }
      }
      setDraggingDeckId(undefined);
    }, []);

    const dragCancelHandler = useCallback(() => {
      setDraggingDeckId(undefined);
    }, []);

    return (
      <DndContext
        sensors={sensors}
        onDragStart={dragStartHandler}
        onDragEnd={dragEndHandler}
        onDragCancel={dragCancelHandler}
      >
        <Component {...props} />
      </DndContext>
    );
  });
}
