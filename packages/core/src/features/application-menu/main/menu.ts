import { Menu } from "electron";

import type { MenuItemOpts } from "./application-menu-items.injectable";

export type MenuTopId = "mac" | "file" | "edit" | "view" | "help";

export function buildMenu(applicationMenuItems: MenuItemOpts[]) {
  Menu.setApplicationMenu(Menu.buildFromTemplate(applicationMenuItems));
}
