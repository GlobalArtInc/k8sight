import { getInjectable } from "@ogre-tools/injectable";
import openConfirmDialogInjectable from "./open.injectable";

import type { ConfirmDialogParams } from "./confirm-dialog";

export type WithConfirmation = (params: ConfirmDialogParams) => () => void;

const withConfirmationInjectable = getInjectable({
  id: "with-confirmation",
  instantiate: (di): WithConfirmation => {
    const open = di.inject(openConfirmDialogInjectable);

    return (params) => () => open(params);
  },
});

export default withConfirmationInjectable;
