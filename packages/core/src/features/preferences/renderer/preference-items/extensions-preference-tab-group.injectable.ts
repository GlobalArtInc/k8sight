import { getInjectable } from "@ogre-tools/injectable";
import { preferenceItemInjectionToken } from "./preference-item-injection-token";

const extensionsPreferenceTabGroupInjectable = getInjectable({
  id: "extensions-preference-tab-group",

  instantiate: () => ({
    kind: "tab-group" as const,
    id: "extensions-tab-group",
    parentId: "preference-tabs" as const,
    label: "Extensions",
    orderNumber: 20,
    iconName: "extension",
  }),

  injectionToken: preferenceItemInjectionToken,
});

export default extensionsPreferenceTabGroupInjectable;
