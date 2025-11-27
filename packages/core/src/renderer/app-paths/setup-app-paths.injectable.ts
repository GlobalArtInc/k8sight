import { beforeApplicationIsLoadingInjectionToken } from "@kubesightapp/application";
import { requestFromChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import { appPathsChannel } from "../../common/app-paths/app-paths-channel";
import appPathsStateInjectable from "../../common/app-paths/app-paths-state.injectable";

const setupAppPathsInjectable = getInjectable({
  id: "setup-app-paths",

  instantiate: (di) => ({
    run: async () => {
      const requestFromChannel = di.inject(requestFromChannelInjectionToken);
      const appPathsState = di.inject(appPathsStateInjectable);
      const appPaths = await requestFromChannel(appPathsChannel);

      appPathsState.set(appPaths);
    },
  }),

  injectionToken: beforeApplicationIsLoadingInjectionToken,
});

export default setupAppPathsInjectable;
