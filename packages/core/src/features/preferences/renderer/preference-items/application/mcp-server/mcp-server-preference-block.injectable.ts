import { getInjectable } from "@ogre-tools/injectable";
import { preferenceItemInjectionToken } from "../../preference-item-injection-token";
import { McpServerPreference } from "./mcp-server";

const mcpServerPreferenceBlockInjectable = getInjectable({
  id: "mcp-server-preference-item",

  instantiate: () => ({
    kind: "block" as const,
    id: "mcp-server",
    parentId: "application-page",
    orderNumber: 100,
    Component: McpServerPreference,
  }),

  injectionToken: preferenceItemInjectionToken,
});

export default mcpServerPreferenceBlockInjectable;
