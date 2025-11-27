import { getInjectable } from "@ogre-tools/injectable";
import electronDialogInjectable from "./electron-dialog.injectable";

const showErrorPopupInjectable = getInjectable({
  id: "show-error-popup",

  instantiate: (di) => {
    const dialog = di.inject(electronDialogInjectable);

    return (heading: string, message: string) => {
      dialog.showErrorBox(heading, message);
    };
  },
});

export default showErrorPopupInjectable;
