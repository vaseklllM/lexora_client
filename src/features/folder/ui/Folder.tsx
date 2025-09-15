"use client";

import { Folder as FolderEntity } from "@/entities/folder";
import { ModalAgree } from "@/entities/modal-agree";
import { IFolder } from "@/shared/api/endpoints/schemas/folder.schema";
import { ReactElement, useState } from "react";
import { useButtons } from "./useButtons";
import { useDeleteFolder } from "./useDeleteFolder";

interface Props {
  className?: string;
  folder: IFolder;
}

export const Folder = (props: Props): ReactElement => {
  const [isOpenModalDeleteAgree, setIsOpenModalDeleteAgree] = useState(false);
  const buttons = useButtons({
    onDelete() {
      setIsOpenModalDeleteAgree(true);
    },
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
    </>
  );
};
