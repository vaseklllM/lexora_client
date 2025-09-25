"use client";

import { IFolderBreadcrumb } from "@/api/schemas/folder-breadcrumb.schema";
import { routes } from "@/shared/routes";
import { ButtonBack as ButtonBackShared } from "@/shared/ui/ButtonBack";
import { ReactElement, useMemo } from "react";

interface Props {
  className?: string;
  foldersBreadcrumbs: IFolderBreadcrumb[];
}

export const ButtonBack = (props: Props): ReactElement => {
  const parentFolder = useMemo<IFolderBreadcrumb | undefined>(() => {
    return props.foldersBreadcrumbs[props.foldersBreadcrumbs.length - 1];
  }, [props.foldersBreadcrumbs]);

  const backUrl = useMemo<string>((): string => {
    if (parentFolder?.id) {
      return routes.dashboard.folder.url(parentFolder.id);
    }
    return routes.dashboard.url();
  }, [parentFolder?.id]);

  return <ButtonBackShared href={backUrl} className={props.className} />;
};
