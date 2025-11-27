import { getInjectable } from "@ogre-tools/injectable";
import openConfirmDialogInjectable from "./open.injectable";

import type { ConfirmDialogBooleanParams } from "./confirm-dialog";

export type Confirm = (params: ConfirmDialogBooleanParams) => Promise<boolean>;

const confirmInjectable = getInjectable({
  id: "confirm",
  instantiate: (di): Confirm => {
    const open = di.inject(openConfirmDialogInjectable);

    return (params) =>
      new Promise((resolve) => {
        open({
          ok: () => resolve(true),
          cancel: () => resolve(false),
          ...params,
        });
      });
  },
});

export default confirmInjectable;
