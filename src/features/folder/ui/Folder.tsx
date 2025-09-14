import { Folder as FolderEntity } from "@/entities/folder";
import { IFolder } from "@/shared/api/endpoints/dashboard";
import { ReactElement } from "react";

interface Props {
  className?: string;
  folder: IFolder;
}

export const Folder = (props: Props): ReactElement => {
  return <FolderEntity {...props} />;
};
