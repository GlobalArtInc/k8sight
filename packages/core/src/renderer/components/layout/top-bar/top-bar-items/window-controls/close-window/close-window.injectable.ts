import { getInjectable } from "@ogre-tools/injectable";
import { WindowAction } from "../../../../../../../common/ipc/window";
import { requestWindowAction } from "../../../../../../ipc";

const closeWindowInjectable = getInjectable({
  id: "close-window",
  instantiate: () => () => requestWindowAction(WindowAction.CLOSE),
  causesSideEffects: true,
});

export default closeWindowInjectable;
