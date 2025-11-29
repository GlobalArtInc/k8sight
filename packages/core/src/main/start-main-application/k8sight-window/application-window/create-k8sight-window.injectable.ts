import { getInjectable } from "@ogre-tools/injectable";
import createElectronWindowInjectable from "./create-electron-window.injectable";

import type { ClusterFrameInfo } from "../../../../common/cluster-frames.injectable";
import type { ContentSource, ElectronWindowTitleBarStyle } from "./create-electron-window.injectable";

export interface ElectronWindow {
  show: () => void;
  close: () => void;
  send: (args: SendToViewArgs) => void;
  loadFile: (filePath: string) => Promise<void>;
  loadUrl: (url: string) => Promise<void>;
  reload: () => void;
}

export interface SendToViewArgs {
  channel: string;
  frameInfo?: ClusterFrameInfo;
  data?: unknown;
}

export interface K8sightWindow {
  id: string;
  start: () => Promise<void>;
  close: () => void;
  show: () => void;
  send: (args: SendToViewArgs) => void;
  isVisible: boolean;
  isStarting: boolean;
  reload: () => void;
}

export interface K8sightWindowConfiguration {
  id: string;
  title: string;
  defaultHeight: number;
  defaultWidth: number;
  getContentSource: () => ContentSource;
  resizable: boolean;
  windowFrameUtilitiesAreShown: boolean;
  centered: boolean;
  titleBarStyle?: ElectronWindowTitleBarStyle;

  /**
   * This function is called before the ContentSource is used and then awaited after
   * the open call resolves
   */
  beforeOpen?: () => Promise<void>;
  onFocus?: () => void;
  onBlur?: () => void;
  onDomReady?: () => void;
  onClose?: () => void;
}

const createK8sightWindowInjectable = getInjectable({
  id: "create-k8sight-window",

  instantiate: (di) => {
    const createElectronWindow = di.inject(createElectronWindowInjectable);

    return (configuration: K8sightWindowConfiguration): K8sightWindow => {
      let browserWindow: ElectronWindow | undefined;

      let windowIsShown = false;
      let windowIsStarting = false;

      const showWindow = () => {
        if (!browserWindow) {
          throw new Error("Cannot show browserWindow, does not exist");
        }

        browserWindow.show();
        windowIsShown = true;
      };

      return {
        id: configuration.id,

        get isVisible() {
          return windowIsShown;
        },

        get isStarting() {
          return windowIsStarting;
        },

        start: async () => {
          if (!browserWindow) {
            windowIsStarting = true;

            browserWindow = createElectronWindow({
              ...configuration,
              onClose: () => {
                browserWindow = undefined;
                windowIsShown = false;
              },
            });

            const { file: filePathForContent, url: urlForContent } = configuration.getContentSource();

            const beforeOpen = configuration.beforeOpen?.();

            if (filePathForContent) {
              await browserWindow.loadFile(filePathForContent);
            } else if (urlForContent) {
              await browserWindow.loadUrl(urlForContent);
            }

            await beforeOpen;
          }

          showWindow();

          windowIsStarting = false;
        },

        show: showWindow,

        close: () => {
          browserWindow?.close();
          browserWindow = undefined;
          windowIsShown = false;
          configuration.onClose?.();
        },

        send: (args: SendToViewArgs) => {
          if (!browserWindow) {
            throw new Error(`Tried to send message to window "${configuration.id}" but the window was closed`);
          }

          return browserWindow.send(args);
        },

        reload: () => {
          if (!browserWindow) {
            throw new Error(`Tried to reload window "${configuration.id}" but the window was closed`);
          }

          return browserWindow.reload();
        },
      };
    };
  },
});

export default createK8sightWindowInjectable;
