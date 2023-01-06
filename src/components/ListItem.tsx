import { ReactNode } from "react";
import { ListItemElement } from "../utils/slate-types";

type Props = {
  element: ListItemElement;
  children: ReactNode;
};

export const ListItem = ({ element, children }: Props) => {
  return (
    <ul className="m-0">
      <li>{children}</li>
    </ul>
  );
};
