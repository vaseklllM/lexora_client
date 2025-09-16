import { ReactElement } from "react";
import { tv } from "tailwind-variants";

type IconType = "folder" | "document";

export type Breadcrumb = {
  icon?: IconType;
  title: string;
  url: string;
};

const classesSlots = tv({
  slots: {
    base: "breadcrumbs text-sm",
  },
});

interface Props {
  className?: string;
  breadcrumbs: Breadcrumb[];
}

export const Breadcrumbs = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <div className={classes.base({ className: props.className })}>
      <ul>
        {props.breadcrumbs.map((breadcrumb, index) => (
          <Breadcrumb
            key={breadcrumb.url}
            {...breadcrumb}
            isLast={index === props.breadcrumbs.length - 1}
          />
        ))}
      </ul>
    </div>
  );
};

function Breadcrumb(props: Breadcrumb & { isLast: boolean }) {
  return (
    <li>
      {props.isLast ? (
        <span className="inline-flex !cursor-default items-center gap-2 hover:!no-underline">
          {props.icon && <Icon icon={props.icon} />}
          {props.title}
        </span>
      ) : (
        <a>
          {props.icon && <Icon icon={props.icon} />}
          {props.title}
        </a>
      )}
    </li>
  );
}

function Icon(props: { icon: IconType }) {
  switch (props.icon) {
    case "folder":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-4 w-4 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          ></path>
        </svg>
      );

    case "document":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-4 w-4 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
      );
  }
}
