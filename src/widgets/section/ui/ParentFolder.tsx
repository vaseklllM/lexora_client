import { IFolder } from "@/api/schemas/folder.schema";
import { Folder } from "@/entities/folder";
import { routes } from "@/shared/routes";
import { useRouter } from "next/navigation";
import { ReactElement, useCallback, useMemo } from "react";

interface Props {
  className?: string;
  parentFolder?: IFolder;
}

export const ParentFolder = (props: Props): ReactElement => {
  const router = useRouter();

  const parentFolder = useMemo((): Partial<IFolder> => {
    if (props.parentFolder) {
      return {
        id: props.parentFolder.id,
        name: "...",
      };
    }

    return {
      id: "dashboard",
      name: "...",
    };
  }, [props.parentFolder]);

  const clickHandler = useCallback(() => {
    if (props.parentFolder?.id) {
      router.push(routes.dashboard.folder.url(props.parentFolder.id));
    } else {
      router.push(routes.dashboard.url());
    }
  }, [props.parentFolder?.id, router]);

  return (
    <Folder folder={parentFolder} icon="arrowBack" onClick={clickHandler} />
  );
};
