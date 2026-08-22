import { getInjectable } from "@ogre-tools/injectable";

export type SettleMcpPrompt = (approved: boolean) => void;

/**
 * Prompts awaiting an answer, keyed by the id carried out to the renderer and back.
 */
const pendingMcpPromptsInjectable = getInjectable({
  id: "pending-mcp-prompts",
  instantiate: () => new Map<string, SettleMcpPrompt>(),
});

export default pendingMcpPromptsInjectable;
