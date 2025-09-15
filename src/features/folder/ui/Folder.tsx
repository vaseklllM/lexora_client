"use client";

import { Folder as FolderEntity } from "@/entities/folder";
import { IFolder } from "@/shared/api/endpoints/schemas/folder.schema";
import { ReactElement } from "react";
import { useButtons } from "./useButtons";

interface Props {
  className?: string;
  folder: IFolder;
}

export const Folder = (props: Props): ReactElement => {
  const buttons = useButtons();
  return <FolderEntity {...props} dottedDropdownButtons={buttons} />;
};
