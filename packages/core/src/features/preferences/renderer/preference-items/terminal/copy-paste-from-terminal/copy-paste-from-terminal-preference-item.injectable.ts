import { getInjectable } from "@ogre-tools/injectable";
import { preferenceItemInjectionToken } from "../../preference-item-injection-token";
import { CopyPasteFromTerminal } from "./copy-paste-from-terminal";

const copyPasteFromTerminalPreferenceItemInjectable = getInjectable({
  id: "copy-paste-from-terminal-preference-item",

  instantiate: () => ({
    kind: "block" as const,
    id: "copy-paste-from-terminal-preference-item",
    parentId: "terminal-page",
    orderNumber: 20,
    Component: CopyPasteFromTerminal,
  }),

  injectionToken: preferenceItemInjectionToken,
});

export default copyPasteFromTerminalPreferenceItemInjectable;
