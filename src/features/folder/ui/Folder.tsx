"use client";

import { IFolder } from "@/api/schemas/folder.schema";
import { Folder as FolderEntity } from "@/entities/folder";
import { ReactElement } from "react";
import { useButtons } from "./useButtons";

export interface FolderProps {
  className?: string;
  folder: IFolder;
}

export const Folder = (props: FolderProps): ReactElement => {
  const buttons = useButtons(props);

  return <FolderEntity {...props} dottedDropdownButtons={buttons} />;
};
