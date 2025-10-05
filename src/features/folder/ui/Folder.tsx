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
});

export interface FolderProps {
  className?: string;
  folder: IFolder;
}

export const Folder = memo((props: FolderProps): ReactElement => {
  const buttons = useButtons(props);
  const router = useRouter();
  const { isOver, setNodeRef } = useDroppable({
    id: props.folder.id,
  });

  const clickHandler = useCallback(
    (event: React.MouseEvent) => {
      if (event.altKey || event.metaKey) {
        window.open(routes.dashboard.folder.url(props.folder.id), "_blank");
      } else {
        router.push(routes.dashboard.folder.url(props.folder.id));
      }
    },
    [props.folder.id, router],
  );

  return (
    <FolderEntity
      folder={props.folder}
      dottedDropdownButtons={buttons}
      onClick={clickHandler}
      ref={setNodeRef}
      icon="folder"
      isOver={isOver}
      className={classes({
        className: props.className,
      })}
    />
  );
});

Folder.displayName = "Folder";
