import { getInjectable } from "@ogre-tools/injectable";
import { reloadPageChannel } from "../../../features/navigation/reload-page/common/channel";
import getCurrentApplicationWindowInjectable from "./application-window/get-current-application-window.injectable";
import currentClusterFrameInjectable from "./current-cluster-frame/current-cluster-frame.injectable";

const reloadCurrentApplicationWindowInjectable = getInjectable({
  id: "reload-current-application-window",

  instantiate: (di) => {
    const getCurrentApplicationWindow = di.inject(getCurrentApplicationWindowInjectable);
    const currentClusterIframe = di.inject(currentClusterFrameInjectable);

    return () => {
      const k8sightWindow = getCurrentApplicationWindow();

      if (!k8sightWindow) {
        return;
      }

      const frameInfo = currentClusterIframe.get();

      if (frameInfo) {
        k8sightWindow.send({
          channel: reloadPageChannel.id,
          frameInfo,
        });
      } else {
        k8sightWindow.reload();
      }
    };
  },
});

export default reloadCurrentApplicationWindowInjectable;
