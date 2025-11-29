import { getInjectable } from "@ogre-tools/injectable";
import { Menu, MenuItem } from "electron";
import isDevelopmentInjectable from "../../../common/vars/is-development.injectable";
import isMacInjectable from "../../../common/vars/is-mac.injectable";

import type { BrowserWindow, ContextMenuParams } from "electron";

export type SetupContextMenuHandler = (win: BrowserWindow) => void;

const setupContextMenuHandlerInjectable = getInjectable({
  id: "setup-context-menu-handler",

  instantiate: (di): SetupContextMenuHandler => {
    const isDevelopment = di.inject(isDevelopmentInjectable);
    const isMac = di.inject(isMacInjectable);

    return (win) => {
      if (!isDevelopment) {
        return;
      }

      // Track modifier keys state globally
      let metaKeyPressed = false;
      let ctrlKeyPressed = false;
      let altKeyPressed = false;

      // Track keyboard state through before-input-event
      win.webContents.on("before-input-event", (event, input) => {
        if (input.type === "keyDown") {
          if (input.meta) metaKeyPressed = true;
          if (input.control) ctrlKeyPressed = true;
          if (input.alt) altKeyPressed = true;
        } else if (input.type === "keyUp") {
          if (!input.meta) metaKeyPressed = false;
          if (!input.control) ctrlKeyPressed = false;
          if (!input.alt) altKeyPressed = false;
        }
      });

      win.webContents.on("context-menu", (event, params: ContextMenuParams) => {
        // Show menu only if Command (Meta) or Alt is pressed with right mouse click
        // macOS: Command (Meta) usually as modifier; Windows/Linux: Alt
        const isCommandClick = isMac ? metaKeyPressed : ctrlKeyPressed;
        const isAltClick = altKeyPressed;

        if (!(isCommandClick || isAltClick)) {
          return;
        }

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
