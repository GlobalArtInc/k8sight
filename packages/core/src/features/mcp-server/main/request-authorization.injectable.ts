import { sendMessageToChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import showApplicationWindowInjectable from "../../../main/start-main-application/k8sight-window/show-application-window.injectable";
import { mcpAuthorizationRequestedChannel } from "../common/channels";
import askMcpUserInjectable from "./ask-user.injectable";

import type { McpAuthorizationRequest } from "../common/channels";

export type RequestMcpAuthorization = (request: Omit<McpAuthorizationRequest, "id">) => Promise<boolean>;

/**
 * Asks the user, inside k8sight, whether a client that just pressed "Authorize" may connect.
 *
 * Nothing is rendered at the `/authorize` endpoint on purpose: a web consent page served over
 * loopback proves nothing about who opened it, whereas the app the user already trusts does.
 */
const requestMcpAuthorizationInjectable = getInjectable({
  id: "request-mcp-authorization",

  instantiate: (di): RequestMcpAuthorization => {
    const sendMessageToChannel = di.inject(sendMessageToChannelInjectionToken);
    const askUser = di.inject(askMcpUserInjectable);

    return async (request) => {
      /*
       * The user is looking at their MCP client or a browser tab that is now spinning, so the
       * window carrying the question has to come to them -- otherwise the flow just times out.
       *
       * Resolved here rather than above so that building the endpoint does not drag the whole
       * window stack in with it.
       */
      await di.inject(showApplicationWindowInjectable)();

      return askUser((id) => sendMessageToChannel(mcpAuthorizationRequestedChannel, { id, ...request }));
    };
  },
});

export default requestMcpAuthorizationInjectable;
