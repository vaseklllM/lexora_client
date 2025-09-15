"use client";

import { Folder as FolderEntity } from "@/entities/folder";
import { ModalAgree, ModalAgreeOnAgree } from "@/entities/modal-agree";
import { IFolder } from "@/shared/api/endpoints/schemas/folder.schema";
import { ReactElement, useCallback, useState } from "react";
import { deleteFolder } from "./deleteFolder";
import { useButtons } from "./useButtons";

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

  const onDelete = useCallback<ModalAgreeOnAgree>(async ({ closeModal }) => {
    closeModal();
    await deleteFolder(props.folder.id);
  }, []);

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
