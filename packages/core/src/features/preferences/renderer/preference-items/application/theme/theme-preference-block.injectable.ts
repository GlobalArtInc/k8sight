import { getInjectable } from "@ogre-tools/injectable";
import { preferenceItemInjectionToken } from "../../preference-item-injection-token";
import { Theme } from "./theme";

const themePreferenceBlockInjectable = getInjectable({
  id: "theme-preference-item",

  instantiate: () => ({
    kind: "block" as const,
    id: "theme",
    parentId: "application-page",
    orderNumber: 10,
    Component: Theme,
  }),

  injectionToken: preferenceItemInjectionToken,
});

export default themePreferenceBlockInjectable;
