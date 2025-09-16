"use client";

import { IFolder } from "@/api/schemas/folder.schema";
import { Folder as FolderEntity } from "@/entities/folder";
import { ModalAgree } from "@/entities/modal-agree";
import { ModalRenameFolder } from "@/features/modal-rename-folder";
import { ReactElement, useState } from "react";
import { useButtons } from "./useButtons";
import { useDeleteFolder } from "./useDeleteFolder";

interface Props {
  className?: string;
  folder: IFolder;
}

export const Folder = (props: Props): ReactElement => {
  const [isOpenModalDeleteAgree, setIsOpenModalDeleteAgree] = useState(false);
  const [isOpenModalRenameFolder, setIsOpenModalRenameFolder] = useState(false);

  const buttons = useButtons({
    setIsOpenModalDeleteAgree,
    setIsOpenModalRenameFolder,
  });

  const onDelete = useDeleteFolder(props.folder.id);

  return (
    <>
      <FolderEntity {...props} dottedDropdownButtons={buttons} />
      <ModalAgree
        isOpen={isOpenModalDeleteAgree}
        setIsOpen={setIsOpenModalDeleteAgree}
        title={`Delete Folder "${props.folder.name}"`}
        description="Are you sure you want to delete this folder?"
        cancelButtonText="Cancel"
        agreeButtonText="Delete"
        onAgree={onDelete}
      />
      <ModalRenameFolder
        isOpen={isOpenModalRenameFolder}
        setIsOpen={setIsOpenModalRenameFolder}
        folderId={props.folder.id}
        folderName={props.folder.name}
      />
    </>
  );
};
