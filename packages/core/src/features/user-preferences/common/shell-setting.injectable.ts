import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import userInfoInjectable from "../../../common/vars/user-info.injectable";
import userPreferencesStateInjectable from "./state.injectable";

const userShellSettingInjectable = getInjectable({
  id: "user-shell-setting",
  instantiate: (di) => {
    const state = di.inject(userPreferencesStateInjectable);
    const userInfo = di.inject(userInfoInjectable);

    return computed(() => state.shell || userInfo.shell);
  },
});

export default userShellSettingInjectable;
