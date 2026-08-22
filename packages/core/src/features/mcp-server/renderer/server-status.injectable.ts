import { requestFromChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import { observable, runInAction } from "mobx";
import { mcpRevokeClientChannel, mcpServerStatusChannel } from "../common/channels";
import { mcpServerUrl } from "../common/vars";

import type { IObservableValue } from "mobx";

import type { McpServerStatus } from "../common/channels";

export interface McpServerStatusStore {
  readonly status: IObservableValue<McpServerStatus>;
  refresh: () => Promise<void>;
  revoke: (clientId: string) => Promise<void>;
}

/**
 * The renderer's view of the endpoint. Main owns the truth -- who is authorised is decided by what
 * is on disk there -- so this only ever mirrors an answer it asked for.
 */
const mcpServerStatusInjectable = getInjectable({
  id: "mcp-server-status",

  instantiate: (di): McpServerStatusStore => {
    const requestFromChannel = di.inject(requestFromChannelInjectionToken);

    const status = observable.box<McpServerStatus>(
      { isRunning: false, url: mcpServerUrl, clients: [] },
      { deep: false },
    );

    const refresh = async () => {
      const next = await requestFromChannel(mcpServerStatusChannel);

      runInAction(() => status.set(next));
    };

    return {
      status,
      refresh,

      revoke: async (clientId) => {
        await requestFromChannel(mcpRevokeClientChannel, clientId);
        await refresh();
      },
    };
  },
});

export default mcpServerStatusInjectable;
