"use client";

import { IFolder } from "@/api/schemas/folder.schema";
import { Folder as FolderEntity } from "@/entities/folder";
import { routes } from "@/shared/routes";
import { useDroppable } from "@dnd-kit/core";
import { useRouter } from "next/navigation";
import { memo, ReactElement, useCallback } from "react";
import { tv } from "tailwind-variants";
import { useButtons } from "./useButtons";

const classes = tv({
  base: "",
  variants: {
    isOver: {
      true: "border-primary",
      false: "",
    },
    isDragging: {
      true: "",
      false: "",
    },
  },
});

export interface FolderProps {
  className?: string;
  folder: IFolder;
  isDragging?: boolean;
}

export const Folder = memo((props: FolderProps): ReactElement => {
  const buttons = useButtons(props);
  const router = useRouter();
  const { isOver, setNodeRef } = useDroppable({
    id: props.folder.id,
  });

  const clickHandler = useCallback(() => {
    router.push(routes.dashboard.folder.url(props.folder.id));
  }, [props.folder.id]);

  return (
    <FolderEntity
      folder={props.folder}
      dottedDropdownButtons={buttons}
      onClick={clickHandler}
      ref={setNodeRef}
      className={classes({
        isOver,
        isDragging: props.isDragging,
        className: props.className,
      })}
    />
  );
});

Folder.displayName = "Folder";
