import { ReactNode } from "react";

export type MenuItemType = {
  icon: ReactNode;
  onAction(): void;
  text: string;
};

export type ListItemMenuProps = {
  listItems: MenuItemType[];
}