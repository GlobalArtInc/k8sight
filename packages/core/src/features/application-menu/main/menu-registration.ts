import type { MenuItemConstructorOptions } from "electron";
import type { IComputedValue } from "mobx";

export type MenuRegistration = {
  parentId: string;
  visible?: IComputedValue<boolean> | boolean;
} & Omit<MenuItemConstructorOptions, "visible">;
