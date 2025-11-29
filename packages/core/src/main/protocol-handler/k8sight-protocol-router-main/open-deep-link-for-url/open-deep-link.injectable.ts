import { getInjectable } from "@ogre-tools/injectable";
import k8sightProtocolRouterMainInjectable from "../k8sight-protocol-router-main.injectable";

const openDeepLinkInjectable = getInjectable({
  id: "open-deep-link",

  instantiate: (di) => {
    const getProtocolRouter = () => di.inject(k8sightProtocolRouterMainInjectable);

    return async (url: string) => {
      await getProtocolRouter().route(url);
    };
  },
});

export default openDeepLinkInjectable;
