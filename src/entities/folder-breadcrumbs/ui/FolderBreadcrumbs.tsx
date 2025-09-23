import { IFolderBreadcrumb } from "@/api/schemas/folder-breadcrumb.schema";
import { routes } from "@/shared/routes";
import { Breadcrumb, Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import { ReactElement, useMemo } from "react";

interface Props {
  className?: string;
  breadcrumbs?: IFolderBreadcrumb[];
  lastItem?: Breadcrumb;
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
      crumbs.push({
        icon: props.lastItem.icon,
        title: props.lastItem.title,
        url: props.lastItem.url,
      });
    }

    return crumbs;
  }, [props.breadcrumbs, props.lastItem]);

  return <Breadcrumbs className={props.className} breadcrumbs={breadcrumbs} />;
};
