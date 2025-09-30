import { IFolder } from "@/api/schemas/folder.schema";
import { Folder } from "@/entities/folder";
import { routes } from "@/shared/routes";
import { useDroppable } from "@dnd-kit/core";
import { useRouter } from "next/navigation";
import { memo, ReactElement, useCallback, useMemo } from "react";

interface Props {
  className?: string;
  parentFolder?: IFolder;
}

export const ParentFolder = memo((props: Props): ReactElement => {
  const router = useRouter();

  const parentFolder = useMemo((): Pick<IFolder, "id" | "name"> => {
    if (props.parentFolder) {
      return {
        id: props.parentFolder.id,
        name: "...",
      };
    }

    return {
      id: "home",
      name: "...",
    };
  }, [props.parentFolder]);

  const { isOver, setNodeRef } = useDroppable({
    id: parentFolder.id,
  });

  const clickHandler = useCallback(() => {
    if (props.parentFolder?.id) {
      router.push(routes.dashboard.folder.url(props.parentFolder.id));
    } else {
      router.push(routes.dashboard.url());
    }
  }, [props.parentFolder?.id, router]);

  return (
    <Folder
      ref={setNodeRef}
      folder={parentFolder}
      icon="arrowBack"
      isOver={isOver}
      onClick={clickHandler}
    />
  );
});

ParentFolder.displayName = "ParentFolder";
