import React from "react";

interface Props {
  className?: string;
  title: string;
  data: object;
}

export const Pre = (props: Props): React.ReactElement | null => {
  return (
    <div className={props.className}>
      <h3>{props.title}:</h3>
      <pre>{JSON.stringify(props.data, null, 2)}</pre>
    </div>
  );
};
