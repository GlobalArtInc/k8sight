import { getInjectable } from "@ogre-tools/injectable";
import { preferenceItemInjectionToken } from "../../preference-item-injection-token";
import { StartUp } from "./start-up";

const startUpPreferenceBlockInjectable = getInjectable({
  id: "start-up-preference-item",

  instantiate: () => ({
    kind: "block" as const,
    id: "start-up",
    parentId: "application-page",
    orderNumber: 30,
    Component: StartUp,
  }),

  injectionToken: preferenceItemInjectionToken,
});

export default startUpPreferenceBlockInjectable;
