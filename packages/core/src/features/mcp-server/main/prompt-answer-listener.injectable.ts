import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import { mcpPromptAnsweredChannel } from "../common/channels";
import pendingMcpPromptsInjectable from "./pending-prompts.injectable";

const mcpPromptAnswerListenerInjectable = getRequestChannelListenerInjectable({
  id: "mcp-prompt-answer-listener",
  channel: mcpPromptAnsweredChannel,

  getHandler: (di) => {
    const pending = di.inject(pendingMcpPromptsInjectable);

    // Late or duplicate answers -- a second frame, a retry -- have nothing left to settle.
    return ({ id, approved }) => pending.get(id)?.(approved);
  },
});

export default mcpPromptAnswerListenerInjectable;
