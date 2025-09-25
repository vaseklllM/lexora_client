import { IFolderBreadcrumb } from "@/api/schemas/folder-breadcrumb.schema";
import { routes } from "@/shared/routes";
import { Breadcrumb, Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import { ReactElement, useMemo } from "react";

interface Props {
  className?: string;
  breadcrumbs?: IFolderBreadcrumb[];
  lastItem?: Breadcrumb | Breadcrumb[];
}

export const FolderBreadcrumbs = (props: Props): ReactElement => {
  const breadcrumbs = useMemo<Breadcrumb[]>((): Breadcrumb[] => {
    const crumbs: Breadcrumb[] = [
      {
        title: "Home",
        url: routes.dashboard.url(),
      },
    ];

    if (!props.breadcrumbs) return crumbs;

    props.breadcrumbs.forEach((breadcrumb) => {
      crumbs.push({
        icon: "folder",
        title: breadcrumb.name,
        url: routes.dashboard.folder.url(breadcrumb.id),
      });
    });

    if (props.lastItem) {
      if (Array.isArray(props.lastItem)) {
        props.lastItem.forEach((item) => crumbs.push(item));
      } else {
        crumbs.push(props.lastItem);
      }
    }

    return crumbs;
  }, [props.breadcrumbs, props.lastItem]);

  return <Breadcrumbs className={props.className} breadcrumbs={breadcrumbs} />;
};
