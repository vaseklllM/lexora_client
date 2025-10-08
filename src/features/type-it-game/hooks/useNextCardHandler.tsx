import { ComponentType, createContext, ReactElement, useContext } from "react";
import { TypeItGameNextCardHandler, TypeItGameProps } from "../ui/TypeItGame";

const Context = createContext<TypeItGameNextCardHandler | undefined>(undefined);

export const useNextCardHandler = () => {
  return useContext(Context);
};

export const withNextCardHandlerProvider = (
  Component: ComponentType<TypeItGameProps>,
) => {
  return function Provider(props: TypeItGameProps): ReactElement {
    return (
      <Context.Provider value={props.onNextCard}>
        <Component {...props} />
      </Context.Provider>
    );
  };
};
