import { getInjectable } from "@ogre-tools/injectable";
import { preferenceItemInjectionToken } from "../preference-item-injection-token";

const editorPreferenceTabInjectable = getInjectable({
  id: "editor-preference-tab",

  instantiate: () => ({
    kind: "tab" as const,
    id: "editor-tab",
    parentId: "general-tab-group" as const,
    pathId: "editor",
    label: "Editor",
    orderNumber: 40,
  }),

  injectionToken: preferenceItemInjectionToken,
});

export default editorPreferenceTabInjectable;
