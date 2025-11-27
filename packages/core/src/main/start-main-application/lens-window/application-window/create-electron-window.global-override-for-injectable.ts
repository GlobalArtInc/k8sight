import { getGlobalOverride } from "@kubesightapp/test-utils";
import createElectronWindowInjectable from "./create-electron-window.injectable";

export default getGlobalOverride(createElectronWindowInjectable, () => () => ({
  loadFile: async () => {},
  loadUrl: async () => {},
  show: () => {},
  close: () => {},
  send: () => {},
  reload: () => {},
}));
