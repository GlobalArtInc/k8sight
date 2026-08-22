import { withInjectables } from "@ogre-tools/injectable-react";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { Input } from "../../../../../../renderer/components/input";
import { SubTitle } from "../../../../../../renderer/components/layout/sub-title";
import { Switch } from "../../../../../../renderer/components/switch";
import mcpServerStatusInjectable from "../../../../../mcp-server/renderer/server-status.injectable";
import userPreferencesStateInjectable from "../../../../../user-preferences/common/state.injectable";
import { RemovableItem } from "../../../removable-item/removable-item";

import type { McpServerStatusStore } from "../../../../../mcp-server/renderer/server-status.injectable";
import type { UserPreferencesState } from "../../../../../user-preferences/common/state.injectable";

interface Dependencies {
  state: UserPreferencesState;
  serverStatus: McpServerStatusStore;
}

const NonInjectedMcpServer = observer(({ state, serverStatus }: Dependencies) => {
  const status = serverStatus.status.get();

  useEffect(() => {
    void serverStatus.refresh();
  }, [state.mcpServerEnabled]);

  return (
    <section className="small">
      <SubTitle title="AI assistant access (MCP)" />

      <Switch
        checked={state.mcpServerEnabled}
        onChange={() => (state.mcpServerEnabled = !state.mcpServerEnabled)}
        data-testid="mcp-server-switch"
      >
        Let AI assistants work with your clusters through K8Sight
      </Switch>

      <small className="hint">
        Exposes a Model Context Protocol endpoint on this machine only, so assistants such as Claude or Cursor can
        inspect the clusters K8Sight is already connected to -- no separate kubeconfig setup on their side. Reading
        resources, logs and events happens on its own; restarting a workload, deleting a pod or driving Flux always asks
        you here first.
      </small>

      {state.mcpServerEnabled && (
        <>
          <SubTitle title="Endpoint" />
          <Input readOnly theme="round-black" value={status.url} data-testid="mcp-server-url" />

          <small className="hint" data-testid="mcp-server-state">
            {status.isRunning
              ? "Running. Add this URL to your MCP client and press Authorize -- K8Sight will ask you to approve the client here. There is no token to copy."
              : "Not running yet."}
          </small>

          <SubTitle title="Authorized clients" />

          {status.clients.length === 0 ? (
            <small className="hint" data-testid="mcp-no-authorized-clients">
              None yet.
            </small>
          ) : (
            status.clients.map((client) => (
              <RemovableItem
                key={client.clientId}
                icon="smart_toy"
                onRemove={() => void serverStatus.revoke(client.clientId)}
                data-testid={`mcp-revoke-${client.clientId}`}
              >
                <div className="flex-grow">
                  <div>{client.name}</div>
                  <small className="hint">
                    {`${client.redirectUris[0] ?? "no redirect URI"} -- authorized ${new Date(
                      client.authorizedAt,
                    ).toLocaleString()}`}
                  </small>
                </div>
              </RemovableItem>
            ))
          )}

          <small className="hint">
            Removing a client cuts it off at once: its tokens stop working and it has to ask you again.
          </small>
        </>
      )}
    </section>
  );
});

export const McpServerPreference = withInjectables<Dependencies>(NonInjectedMcpServer, {
  getProps: (di) => ({
    state: di.inject(userPreferencesStateInjectable),
    serverStatus: di.inject(mcpServerStatusInjectable),
  }),
});
