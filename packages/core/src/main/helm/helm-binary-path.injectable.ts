import { getInjectable } from "@ogre-tools/injectable";
import bundledBinaryPathInjectable from "../../common/utils/bundled-binary-path.injectable";
import userPreferencesStateInjectable from "../../features/user-preferences/common/state.injectable";

const helmBinaryPathInjectable = getInjectable({
  id: "helm-binary-path",
  instantiate: (di) => {
    const bundledPath = di.inject(bundledBinaryPathInjectable, "helm");
    const state = di.inject(userPreferencesStateInjectable);

    return state.helmBinariesPath || bundledPath;
  },
});

export default helmBinaryPathInjectable;
