import { getInjectable } from "@ogre-tools/injectable";
import { WindowAction } from "../../../../../../../common/ipc/window";
import { requestWindowAction } from "../../../../../../ipc";

const goBackInjectable = getInjectable({
  id: "go-back",
  instantiate: () => () => requestWindowAction(WindowAction.GO_BACK),
  causesSideEffects: true,
});

export default goBackInjectable;
