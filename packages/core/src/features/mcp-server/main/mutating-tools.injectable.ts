import { PatchStrategy } from "@kubesightapp/kubernetes-client-node";
import { getInjectable } from "@ogre-tools/injectable";
import { z } from "zod";
import mcpClusterAccessInjectable from "./cluster-access.injectable";
import requestMcpConfirmationInjectable from "./request-confirmation.injectable";
import { asDeclined, asText, clusterIdSchema } from "./tool-helpers";

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import type { McpClusterAccess } from "./cluster-access.injectable";
import type { McpConfirmationRequest } from "./request-confirmation.injectable";

/**
 * Kinds Flux drives, with the api version each ships under today. A caller can override it for a
 * cluster still on an older one.
 */
const fluxApiVersions: Record<string, string> = {
  Kustomization: "kustomize.toolkit.fluxcd.io/v1",
  HelmRelease: "helm.toolkit.fluxcd.io/v2",
  GitRepository: "source.toolkit.fluxcd.io/v1",
  OCIRepository: "source.toolkit.fluxcd.io/v1beta2",
  HelmRepository: "source.toolkit.fluxcd.io/v1",
  HelmChart: "source.toolkit.fluxcd.io/v1",
  Bucket: "source.toolkit.fluxcd.io/v1",
};

const fluxTarget = {
  clusterId: clusterIdSchema,
  kind: z.enum(Object.keys(fluxApiVersions) as [string, ...string[]]),
  name: z.string(),
  namespace: z.string(),
  apiVersion: z.string().optional().describe("Only needed when the cluster runs an older api version for this kind"),
};

const workloadKind = z.enum(["Deployment", "StatefulSet", "DaemonSet"]).default("Deployment");

/**
 * Registers the tools that change a cluster.
 *
 * Every one of them stops at a confirm dialog in the app first: the endpoint speaks with the user's
 * own cluster credentials, so the user -- not the assistant holding the token -- decides whether a
 * change happens.
 */
export type RegisterMcpMutatingTools = (server: McpServer) => void;

const registerMcpMutatingToolsInjectable = getInjectable({
  id: "register-mcp-mutating-tools",

  instantiate: (di): RegisterMcpMutatingTools => {
    const access: McpClusterAccess = di.inject(mcpClusterAccessInjectable);
    const requestConfirmation = di.inject(requestMcpConfirmationInjectable);

    const confirmed = async (
      request: Omit<McpConfirmationRequest, "cluster"> & { clusterId: string },
      run: () => Promise<unknown>,
    ) => {
      const { clusterId, ...rest } = request;
      const approved = await requestConfirmation({
        ...rest,
        cluster: access.getCluster(clusterId).name.get(),
      });

      if (!approved) {
        return asDeclined(rest.target);
      }

      return asText(await run());
    };

    return (server) => {
      server.registerTool(
        "restart_deployment",
        {
          title: "Restart a workload",
          description:
            "Rolls a workload's pods, the same way 'kubectl rollout restart' does. Asks the user to confirm in k8sight first.",
          inputSchema: {
            clusterId: clusterIdSchema,
            namespace: z.string(),
            name: z.string(),
            kind: workloadKind,
          },
        },
        async ({ clusterId, namespace, name, kind }) =>
          confirmed(
            {
              clusterId,
              tool: "restart_deployment",
              target: `${kind} ${namespace}/${name}`,
              action: "Roll its pods now (rollout restart)",
            },
            async () => {
              const api = await access.objectApiFor(clusterId);

              // The annotation change is what makes the pod template differ, which is what rolls it.
              return api.patch(
                {
                  apiVersion: "apps/v1",
                  kind,
                  metadata: { name, namespace },
                  spec: {
                    template: {
                      metadata: {
                        annotations: { "kubectl.kubernetes.io/restartedAt": new Date().toISOString() },
                      },
                    },
                  },
                },
                undefined,
                undefined,
                undefined,
                undefined,
                PatchStrategy.StrategicMergePatch,
              );
            },
          ),
      );

      server.registerTool(
        "delete_pod",
        {
          title: "Delete a pod",
          description: "Deletes one pod so its controller replaces it. Asks the user to confirm in k8sight first.",
          inputSchema: {
            clusterId: clusterIdSchema,
            namespace: z.string(),
            name: z.string(),
            gracePeriodSeconds: z.number().int().min(0).max(3600).optional(),
          },
        },
        async ({ clusterId, namespace, name, gracePeriodSeconds }) =>
          confirmed(
            {
              clusterId,
              tool: "delete_pod",
              target: `Pod ${namespace}/${name}`,
              action:
                gracePeriodSeconds === undefined ? "Delete it" : `Delete it with a ${gracePeriodSeconds}s grace period`,
            },
            async () => {
              const api = await access.coreApiFor(clusterId);

              return api.deleteNamespacedPod({ name, namespace, gracePeriodSeconds });
            },
          ),
      );

      server.registerTool(
        "flux_reconcile",
        {
          title: "Reconcile a Flux resource",
          description:
            "Tells Flux to reconcile a resource right away, as 'flux reconcile' does. Asks the user to confirm in k8sight first.",
          inputSchema: fluxTarget,
        },
        async ({ clusterId, kind, name, namespace, apiVersion }) =>
          confirmed(
            {
              clusterId,
              tool: "flux_reconcile",
              target: `${kind} ${namespace}/${name}`,
              action: "Reconcile it now",
            },
            async () => {
              const api = await access.objectApiFor(clusterId);

              return api.patch(
                {
                  apiVersion: apiVersion ?? fluxApiVersions[kind],
                  kind,
                  metadata: {
                    name,
                    namespace,
                    annotations: { "reconcile.fluxcd.io/requestedAt": new Date().toISOString() },
                  },
                },
                undefined,
                undefined,
                undefined,
                undefined,
                // Strategic merge is a built-in-only thing; custom resources take a plain merge.
                PatchStrategy.MergePatch,
              );
            },
          ),
      );

      const registerSuspension = (suspend: boolean) => {
        const tool = suspend ? "flux_suspend" : "flux_resume";

        server.registerTool(
          tool,
          {
            title: suspend ? "Suspend a Flux resource" : "Resume a Flux resource",
            description: suspend
              ? "Stops Flux from reconciling a resource until it is resumed. Asks the user to confirm in k8sight first."
              : "Lets Flux reconcile a suspended resource again. Asks the user to confirm in k8sight first.",
            inputSchema: fluxTarget,
          },
          async ({ clusterId, kind, name, namespace, apiVersion }) =>
            confirmed(
              {
                clusterId,
                tool,
                target: `${kind} ${namespace}/${name}`,
                action: suspend ? "Suspend it, so Flux stops reconciling it" : "Resume it, so Flux reconciles it again",
              },
              async () => {
                const api = await access.objectApiFor(clusterId);

                return api.patch(
                  {
                    apiVersion: apiVersion ?? fluxApiVersions[kind],
                    kind,
                    metadata: { name, namespace },
                    spec: { suspend },
                  },
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  PatchStrategy.MergePatch,
                );
              },
            ),
        );
      };

      registerSuspension(true);
      registerSuspension(false);
    };
  },
});

export default registerMcpMutatingToolsInjectable;
