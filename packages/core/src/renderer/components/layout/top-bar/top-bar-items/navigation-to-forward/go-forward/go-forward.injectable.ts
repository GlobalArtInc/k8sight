import { getInjectable } from "@ogre-tools/injectable";
import { WindowAction } from "../../../../../../../common/ipc/window";
import { requestWindowAction } from "../../../../../../ipc";

const goForwardInjectable = getInjectable({
  id: "go-forward",
  instantiate: () => () => requestWindowAction(WindowAction.GO_FORWARD),
  causesSideEffects: true,
});

export default goForwardInjectable;
