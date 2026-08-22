import { onLoadOfApplicationInjectionToken } from "@kubesightapp/application";
import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import { reaction } from "mobx";
import userPreferencesStateInjectable from "../../user-preferences/common/state.injectable";
import mcpHttpServerInjectable from "./server.injectable";

/**
 * Runs the MCP endpoint for as long as the preference says it should.
 *
 * Nothing secret has to be arranged first: a client proves itself with an access token it earned by
 * being approved in the app, and approvals outlive restarts on their own.
 */
const startMcpServerInjectable = getInjectable({
  id: "start-mcp-server",

  instantiate: (di) => {
    const state = di.inject(userPreferencesStateInjectable);
    const mcpHttpServer = di.inject(mcpHttpServerInjectable);
    const logger = di.inject(loggerInjectionToken);

    return {
      run: () => {
        reaction(
          () => state.mcpServerEnabled,

          (isEnabled) => {
            if (!isEnabled) {
              void mcpHttpServer.stop();

              return;
            }

            mcpHttpServer.start().catch((error) => {
              logger.error(`[MCP-SERVER]: failed to start: ${error}`);
            });
          },

          { fireImmediately: true },
        );
      },
    };
  },

  injectionToken: onLoadOfApplicationInjectionToken,
});

export default startMcpServerInjectable;
