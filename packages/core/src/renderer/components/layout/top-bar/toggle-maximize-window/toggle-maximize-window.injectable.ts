import { getInjectable } from "@ogre-tools/injectable";
import { WindowAction } from "../../../../../common/ipc/window";
import { requestWindowAction } from "../../../../ipc";

const toggleMaximizeWindowInjectable = getInjectable({
  id: "toggle-maximize-window",
  instantiate: () => () => requestWindowAction(WindowAction.TOGGLE_MAXIMIZE),
  causesSideEffects: true,
});

export default toggleMaximizeWindowInjectable;
