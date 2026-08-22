import { sendMessageToChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import { mcpConfirmationRequestedChannel } from "../common/channels";
import askMcpUserInjectable from "./ask-user.injectable";

import type { McpConfirmation } from "../common/channels";

export type McpConfirmationRequest = Omit<McpConfirmation, "id">;

export type RequestMcpConfirmation = (request: McpConfirmationRequest) => Promise<boolean>;

const requestMcpConfirmationInjectable = getInjectable({
  id: "request-mcp-confirmation",

  instantiate: (di): RequestMcpConfirmation => {
    const sendMessageToChannel = di.inject(sendMessageToChannelInjectionToken);
    const askUser = di.inject(askMcpUserInjectable);

    return (request) =>
      askUser((id) => sendMessageToChannel(mcpConfirmationRequestedChannel, { id, ...request }));
  },
});

export default requestMcpConfirmationInjectable;
