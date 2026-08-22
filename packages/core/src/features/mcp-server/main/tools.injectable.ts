import { getInjectable } from "@ogre-tools/injectable";
import { z } from "zod";
import mcpClusterAccessInjectable from "./cluster-access.injectable";
import registerMcpMutatingToolsInjectable from "./mutating-tools.injectable";
import { asText, clusterIdSchema as clusterId } from "./tool-helpers";

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import type { McpClusterAccess } from "./cluster-access.injectable";

/**
 * Registers what k8sight lets an assistant do.
 *
 * The tools here are read-only. The endpoint carries whatever access the user's kubeconfigs have,
 * so everything that changes a cluster lives in the mutating set instead, behind a confirmation in
 * the app.
 */
export type RegisterMcpTools = (server: McpServer) => void;

const registerMcpToolsInjectable = getInjectable({
  id: "register-mcp-tools",

  instantiate: (di): RegisterMcpTools => {
    const access: McpClusterAccess = di.inject(mcpClusterAccessInjectable);
    const registerMutatingTools = di.inject(registerMcpMutatingToolsInjectable);
    const { coreApiFor, objectApiFor } = access;

    return (server) => {
      server.registerTool(
        "list_clusters",
        {
          title: "List clusters",
          description: "Lists the Kubernetes clusters k8sight knows about, with their connection state.",
          inputSchema: {},
        },
        async () =>
          asText(
            access.listClusters().map((cluster) => ({
              id: cluster.id,
              name: cluster.name.get(),
              context: cluster.contextName.get(),
              connected: !cluster.disconnected.get(),
              ready: cluster.ready.get(),
              version: cluster.version.get(),
              distribution: cluster.distribution.get(),
            })),
          ),
      );

      server.registerTool(
        "list_resources",
        {
          title: "List resources",
          description:
            "Lists resources of one kind. Works for built-in kinds and CRDs alike, e.g. apiVersion 'kustomize.toolkit.fluxcd.io/v1' with kind 'Kustomization'.",
          inputSchema: {
            clusterId,
            apiVersion: z.string().describe("e.g. 'v1', 'apps/v1', 'helm.toolkit.fluxcd.io/v2'"),
            kind: z.string().describe("Singular kind, e.g. 'Pod', 'Deployment', 'HelmRelease'"),
            namespace: z.string().optional().describe("Omit to list across all namespaces"),
            labelSelector: z.string().optional(),
          },
        },
        async ({ clusterId, apiVersion, kind, namespace, labelSelector }) => {
          const api = await objectApiFor(clusterId);
          const { items } = await api.list(apiVersion, kind, namespace, undefined, undefined, undefined, labelSelector);

          // Full objects would swamp the context; the shape below is what triage actually needs.
          return asText(
            items.map((item) => ({
              name: item.metadata?.name,
              namespace: item.metadata?.namespace,
              created: item.metadata?.creationTimestamp,
              conditions: (item as { status?: { conditions?: unknown } }).status?.conditions,
            })),
          );
        },
      );

      server.registerTool(
        "get_resource",
        {
          title: "Get resource",
          description: "Fetches one resource in full, as it exists in the cluster.",
          inputSchema: {
            clusterId,
            apiVersion: z.string(),
            kind: z.string(),
            name: z.string(),
            namespace: z.string().optional(),
          },
        },
        async ({ clusterId, apiVersion, kind, name, namespace }) => {
          const api = await objectApiFor(clusterId);

          return asText(await api.read({ apiVersion, kind, metadata: { name, namespace } }));
        },
      );

      server.registerTool(
        "get_pod_logs",
        {
          title: "Get pod logs",
          description: "Reads the log of a pod's container.",
          inputSchema: {
            clusterId,
            namespace: z.string(),
            pod: z.string(),
            container: z.string().optional(),
            tailLines: z.number().int().positive().max(5000).default(200),
            previous: z.boolean().default(false).describe("Read the previous, crashed container instead"),
          },
        },
        async ({ clusterId, namespace, pod, container, tailLines, previous }) => {
          const api = await coreApiFor(clusterId);

          return asText(await api.readNamespacedPodLog({ name: pod, namespace, container, tailLines, previous }));
        },
      );

      server.registerTool(
        "list_events",
        {
          title: "List events",
          description: "Recent events, newest first -- usually the fastest way to see why something is unhealthy.",
          inputSchema: {
            clusterId,
            namespace: z.string().optional(),
            limit: z.number().int().positive().max(500).default(50),
          },
        },
        async ({ clusterId, namespace, limit }) => {
          const api = await coreApiFor(clusterId);
          const { items } = namespace
            ? await api.listNamespacedEvent({ namespace })
            : await api.listEventForAllNamespaces();

          return asText(
            items
              .sort((left, right) =>
                String(right.lastTimestamp ?? right.eventTime ?? "").localeCompare(
                  String(left.lastTimestamp ?? left.eventTime ?? ""),
                ),
              )
              .slice(0, limit)
              .map((event) => ({
                time: event.lastTimestamp ?? event.eventTime,
                type: event.type,
                reason: event.reason,
                object: `${event.involvedObject?.kind}/${event.involvedObject?.name}`,
                namespace: event.metadata?.namespace,
                message: event.message,
              })),
          );
        },
      );

      registerMutatingTools(server);
    };
  },
});

export default registerMcpToolsInjectable;
