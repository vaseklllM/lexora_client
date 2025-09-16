import { revalidateGetDashboard } from "@/api/dashboard/get-dashboard";
import { renameFolder } from "@/api/folder/rename-folder";
import { ModalRename, ModalRenameSaveHandler } from "@/entities/modal-rename";
import { parseBadRequestError } from "@/shared/api-core/parseBadRequestError";
import { MAX_FOLDER_NAME_LENGTH } from "@/shared/config";
import { ReactElement, useCallback } from "react";

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  folderId?: string;
  folderName?: string;
}

export const ModalRenameFolder = (props: Props): ReactElement => {
  const saveHandler = useCallback<ModalRenameSaveHandler>(
    async ({ name, close, setNameError }) => {
      if (!props.folderId) return;

      try {
        await renameFolder({
          name,
          id: props.folderId,
        });
        await close();
        await revalidateGetDashboard();
      } catch (error) {
        if (error instanceof Error) {
          parseBadRequestError<"name">(error, ({ field, firstError }) => {
            switch (field) {
              case "name": {
                setNameError(firstError);
                break;
              }
            }
          });
        }
      }
    },
    [props.folderId],
  );

  return (
    <ModalRename
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSave={saveHandler}
      name={props.folderName}
      title="Rename Folder"
      maxNameLength={MAX_FOLDER_NAME_LENGTH}
    />
  );
};
