import { getInjectable } from "@ogre-tools/injectable";
import lensProtocolRouterMainInjectable from "../lens-protocol-router-main.injectable";

const openDeepLinkInjectable = getInjectable({
  id: "open-deep-link",

  instantiate: (di) => {
    const getProtocolRouter = () => di.inject(lensProtocolRouterMainInjectable);

    return async (url: string) => {
      await getProtocolRouter().route(url);
    };
  },
});

export default openDeepLinkInjectable;
