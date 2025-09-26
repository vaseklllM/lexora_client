import { revalidateGetDashboard } from "@/api/dashboard/get-dashboard";
import { renameFolder } from "@/api/folder/rename-folder";
import { ModalRename, ModalRenameSaveHandler } from "@/entities/modal-rename";
import { ErrorStatus } from "@/shared/api-core/errorStatus";
import { parseBadRequestErrors } from "@/shared/api-core/parseBadRequestErrors";
import { MAX_FOLDER_NAME_LENGTH } from "@/shared/config";
import { withModalRenderController } from "@/shared/hoc/with-modal-render-controller";
import { ReactElement, useCallback } from "react";

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  folderId?: string;
  folderName?: string;
}

export const ModalRenameFolder = withModalRenderController(
  (props: Props): ReactElement => {
    const saveHandler = useCallback<ModalRenameSaveHandler>(
      async ({ name, close, setNameError }) => {
        if (!props.folderId) return;

        const result = await renameFolder({
          name,
          id: props.folderId,
        });

        if (result.ok) {
          await close();
          await revalidateGetDashboard();
        } else {
          switch (result.data.statusCode) {
            case ErrorStatus.BAD_REQUEST: {
              parseBadRequestErrors(
                result.data.errors,
                ({ field, firstError }) => {
                  switch (field) {
                    case "name": {
                      setNameError(firstError);
                      break;
                    }
                  }
                },
              );
              break;
            }

            case ErrorStatus.CONFLICT: {
              setNameError(result.data.message);
              break;
            }
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
  },
);
