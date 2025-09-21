"use client";

import { IFolder } from "@/api/schemas/folder.schema";
import { Folder as FolderEntity } from "@/entities/folder";
import { routes } from "@/shared/routes";
import { useRouter } from "next/navigation";
import { memo, ReactElement, useCallback } from "react";
import { useButtons } from "./useButtons";

export interface FolderProps {
  className?: string;
  folder: IFolder;
}

export const Folder = memo((props: FolderProps): ReactElement => {
  const buttons = useButtons(props);
  const router = useRouter();

  const clickHandler = useCallback(() => {
    router.push(routes.dashboard.folder.url(props.folder.id));
  }, [props.folder.id]);

  return (
    <FolderEntity
      {...props}
      dottedDropdownButtons={buttons}
      onClick={clickHandler}
    />
  );
});

Folder.displayName = "Folder";
