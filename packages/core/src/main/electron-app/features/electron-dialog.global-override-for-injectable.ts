import { getGlobalOverride } from "@kubesightapp/test-utils";
import electronDialogInjectable from "./electron-dialog.injectable";

export default getGlobalOverride(electronDialogInjectable, () => ({
  showCertificateTrustDialog: async () => {},
  showErrorBox: () => {},
  showMessageBox: async () => ({
    checkboxChecked: false,
    response: 0,
  }),
  showMessageBoxSync: () => 0,
  showOpenDialog: async () => ({
    canceled: true,
    filePaths: [],
  }),
  showOpenDialogSync: () => [],
  showSaveDialog: async () => ({
    canceled: true,
    filePath: "",
  }),
  showSaveDialogSync: () => "",
}));
