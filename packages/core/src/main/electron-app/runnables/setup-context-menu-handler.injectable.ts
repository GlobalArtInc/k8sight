import { getInjectable } from "@ogre-tools/injectable";
import { Menu, MenuItem } from "electron";
import isDevelopmentInjectable from "../../../common/vars/is-development.injectable";

import type { BrowserWindow } from "electron";

export type SetupContextMenuHandler = (win: BrowserWindow) => void;

const setupContextMenuHandlerInjectable = getInjectable({
  id: "setup-context-menu-handler",

  instantiate: (di): SetupContextMenuHandler => {
    const isDevelopment = di.inject(isDevelopmentInjectable);

    return (win) => {
      win.webContents.on("context-menu", (event, params) => {
        const menu = new Menu();

        if (params.editFlags.canCut) {
          menu.append(
            new MenuItem({
              label: "Cut",
              role: "cut",
            }),
          );
        }

        if (params.editFlags.canCopy) {
          menu.append(
            new MenuItem({
              label: "Copy",
              role: "copy",
            }),
          );
        }

        if (params.editFlags.canPaste) {
          menu.append(
            new MenuItem({
              label: "Paste",
              role: "paste",
            }),
          );
        }

        if (params.editFlags.canSelectAll) {
          menu.append(
            new MenuItem({
              label: "Select All",
              role: "selectAll",
            }),
          );
        }

        if (isDevelopment) {
          menu.append(
            new MenuItem({
              type: "separator",
            }),
          );

          menu.append(
            new MenuItem({
              label: "Inspect",
              click: () => {
                win.webContents.inspectElement(params.x, params.y);
              },
            }),
          );

          menu.append(
            new MenuItem({
              label: "Open DevTools",
              click: () => {
                win.webContents.openDevTools();
              },
            }),
          );
        }

        menu.popup();
      });
    };
  },
});

export default setupContextMenuHandlerInjectable;

